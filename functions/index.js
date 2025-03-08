const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Parser = require("rss-parser");

admin.initializeApp();
const db = admin.firestore();
const parser = new Parser();

const SUBSTACK_FEED_URL =
  "https://isladelcombate.substack.com/feed"; // Break into new line

exports.fetchSubstackPosts = functions.pubsub
    .schedule("every 30 minutes") // Break into new line
    .onRun(async () => {
      try {
        const feed = await parser.parseURL(SUBSTACK_FEED_URL);
        const batch = db.batch();

        for (const item of feed.items) {
          const postRef = db.collection("Actualizaciones")
              .doc(item.guid); // Break into new line

          const postDoc = await postRef.get();
          if (!postDoc.exists) {
            batch.set(postRef, {
              title: item.title,
              content: item.contentSnippet || item.content,
              link: item.link,
              publishedAt: new Date(item.pubDate),
            }); // ✅ Add missing comma
          }
        }

        await batch.commit();
        console.log("✅ Substack posts updated in Firebase!");
      } catch (error) {
        console.error("❌ Error fetching Substack feed:", error);
      }
    });
