import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Create engaging children's stories in JSON format. Each story should have: story_title, cover_image_prompt, chapters array with chapter_title, chapter_text, and image_prompt for each chapter, and voice_cues array with chapter_title and chapter_text_with_voice_cues including voice direction markers like [pause], [whisper], [speak with excitement], [speak softly], etc. Make stories for ages 4-10, educational yet fun, with vivid descriptions and simple English language.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: JSON.stringify({
            story_title: "Luna and the Magical Garden",
            cover_image_prompt:
              "A beautiful illustration of a young girl with curly hair standing in front of a magical garden filled with glowing flowers, floating butterflies, and sparkling lights. The background shows a peaceful village with mountains in the distance.",
            chapters: [
              {
                chapter_title: "Luna's Discovery",
                chapter_text:
                  "In a small village nestled between green hills lived a curious girl named Luna. One sunny afternoon, while playing near her grandmother's house, Luna discovered a hidden gate covered with flowering vines. Behind the gate lay the most beautiful garden she had ever seen. Flowers of every color imaginable bloomed together, and butterflies danced through the air like tiny dancers.",
                image_prompt:
                  "An illustration of Luna, a young girl with bright eyes and a yellow dress, discovering a magical gate covered in green vines and colorful flowers. Sunlight streams through the trees.",
              },
              {
                chapter_title: "The Garden's Secret",
                chapter_text:
                  "As Luna walked deeper into the garden, she noticed something remarkable. Each flower glowed with a soft light, and when she listened carefully, she could hear them singing. A wise old gardener appeared and smiled warmly. He told Luna that this was a garden where dreams grew like flowers, and each person could help make someone else's dreams come true.",
                image_prompt:
                  "An illustration showing Luna surrounded by glowing flowers. An elderly gardener with kind eyes stands nearby.",
              },
              {
                chapter_title: "Planting Dreams",
                chapter_text:
                  "Luna learned that to plant a dream, she had to think of someone she wanted to help. She thought of her friend Marcus, who dreamed of becoming a brave explorer. Luna planted a special seed and watered it with her kindness. The seed grew into a beautiful blue flower that shimmered with magical light.",
                image_prompt:
                  "An illustration of Luna kneeling beside a glowing blue flower, carefully watering it. The magical garden surrounds her with blooming flowers and floating sparkles.",
              },
              {
                chapter_title: "The Gift of Giving",
                chapter_text:
                  "Over many visits to the garden, Luna learned the true magic: when you help others achieve their dreams, your own dreams grow stronger too. She planted flowers for her teacher, her parents, and children in her village. The garden grew more beautiful with each dream planted.",
                image_prompt:
                  "An illustration showing Luna in the center of a flourishing garden with many different colored flowers blooming. Villagers can be seen in the background.",
              },
              {
                chapter_title: "Luna's Garden Lives On",
                chapter_text:
                  "When Luna returned to the village, she brought seeds from the magical garden and started her own dream garden. Her neighbors helped her plant and care for it. Soon, the whole village had gardens where dreams grew. Magic was everywhere when people worked together and believed in helping each other.",
                image_prompt:
                  "A vibrant illustration of the village transformed with many small gardens full of colorful flowers. Luna stands surrounded by neighbors tending to their gardens.",
              },
            ],
            voice_cues: [
              {
                chapter_title: "Luna's Discovery",
                chapter_text_with_voice_cues:
                  "In a small village nestled between green hills [pause] lived a curious girl named Luna. [speak in a warm tone] One sunny afternoon, [speak with anticipation] while playing near her grandmother's house, Luna discovered a hidden gate [pause] covered with flowering vines. [speak with wonder] Behind the gate lay the most beautiful garden she had ever seen.",
              },
              {
                chapter_title: "The Garden's Secret",
                chapter_text_with_voice_cues:
                  "As Luna walked deeper into the garden, [speak slowly] she noticed something remarkable. [pause] Each flower glowed [speak with amazement] with a soft light. [speak gently] A wise old gardener appeared and smiled warmly. [speak kindly] He told Luna this was a garden where dreams grew like flowers.",
              },
              {
                chapter_title: "Planting Dreams",
                chapter_text_with_voice_cues:
                  "Luna learned [speak with enthusiasm] that to plant a dream, [pause] she had to think of someone she wanted to help. [speak thoughtfully] She thought of her friend Marcus who dreamed of becoming a brave explorer. [pause] The seed grew into a beautiful blue flower [speak with wonder] that shimmered with magical light.",
              },
              {
                chapter_title: "The Gift of Giving",
                chapter_text_with_voice_cues:
                  "Over many visits to the garden, [speak with pride] Luna learned the true magic: [pause] when you help others achieve their dreams, [pause] your own dreams grow stronger too. [speak with joy] The garden grew more beautiful with each dream planted.",
              },
              {
                chapter_title: "Luna's Garden Lives On",
                chapter_text_with_voice_cues:
                  "When Luna returned to the village, [speak with accomplishment] she brought seeds and started her own dream garden. [pause] Her neighbors helped her plant and care for it. [pause] Soon, the whole village had gardens where dreams grew. [speak wisely] Magic was everywhere when people worked together.",
              },
            ],
          }),
        },
      ],
    },
    {
      role: "user",
      parts: [{ text: "Create an engaging children's story" }],
    },
    {
      role: "model",
      parts: [
        {
          text: JSON.stringify({
            story_title: "Sammy the Brave Little Squirrel",
            cover_image_prompt:
              "A cute illustration of a small brown squirrel with big bright eyes and a fluffy tail, standing in a lush green forest with tall oak trees, mushrooms, and woodland flowers.",
            chapters: [
              {
                chapter_title: "Sammy's Forest Home",
                chapter_text:
                  "In the heart of an old forest lived a little squirrel named Sammy. Sammy was not the biggest squirrel, but he had a big heart and lots of courage. He lived in a cozy tree hole with his friends, and they spent their days gathering acorns and playing among the branches.",
                image_prompt:
                  "A charming illustration of Sammy the squirrel in his tree home, with acorns stored on shelves and his forest friends around him.",
              },
              {
                chapter_title: "A New Friend",
                chapter_text:
                  "One day, Sammy heard a soft crying sound. He followed it and found a tiny bird with an injured wing. The bird was afraid and didn't know how to fly back to its nest. Sammy realized he could help this new friend. With patience and kindness, he stayed with the bird all day.",
                image_prompt:
                  "An illustration of Sammy comforting a small injured bird with a gentle expression.",
              },
              {
                chapter_title: "The Rescue Plan",
                chapter_text:
                  "Sammy gathered all his forest friends - the rabbits, the deer, and the wise old owl. Together, they made a plan to help the little bird. The owl knew where the nest was, the deer would help reach the tall tree, and the rabbits would find the softest moss for the nest.",
                image_prompt:
                  "An illustration of Sammy with all his forest friends working together in the forest.",
              },
              {
                chapter_title: "Teamwork Makes Dreams Work",
                chapter_text:
                  "With everyone helping, they carefully brought the little bird back to its nest. The mother bird was so grateful, and the baby bird was happy to be home. Sammy learned that even small creatures can do big things when they work together and care for others.",
                image_prompt:
                  "An illustration showing all the forest animals celebrating as the little bird reunites with its mother.",
              },
              {
                chapter_title: "A Lesson of Friendship",
                chapter_text:
                  "From that day on, Sammy and the little bird became the best of friends. Sammy learned that true courage is not about being the biggest or strongest, but about caring for others and being brave enough to help. The forest became a happier place because of his kindness.",
                image_prompt:
                  "An illustration of Sammy and the bird friend playing together in the forest, surrounded by all their friends.",
              },
            ],
            voice_cues: [
              {
                chapter_title: "Sammy's Forest Home",
                chapter_text_with_voice_cues:
                  "In the heart of an old forest [pause] lived a little squirrel named Sammy. [speak warmly] Sammy was not the biggest squirrel, [pause] but he had a big heart. [speak with joy] He lived in a cozy tree hole [pause] with his friends.",
              },
              {
                chapter_title: "A New Friend",
                chapter_text_with_voice_cues:
                  "One day, [pause] Sammy heard a soft crying sound. [speak gently] He followed it [pause] and found a tiny bird with an injured wing. [speak with concern] The bird was afraid. [pause] Sammy realized he could help this new friend.",
              },
              {
                chapter_title: "The Rescue Plan",
                chapter_text_with_voice_cues:
                  "Sammy gathered all his forest friends [pause] the rabbits, [pause] the deer, and the wise old owl. [speak with determination] Together, they made a plan [pause] to help the little bird.",
              },
              {
                chapter_title: "Teamwork Makes Dreams Work",
                chapter_text_with_voice_cues:
                  "With everyone helping, [pause] they carefully brought the little bird [speak with excitement] back to its nest. [pause] The mother bird was so grateful. [speak with joy] Sammy learned that even small creatures [pause] can do big things when they work together.",
              },
              {
                chapter_title: "A Lesson of Friendship",
                chapter_text_with_voice_cues:
                  "From that day on, [speak with warmth] Sammy and the little bird became the best of friends. [pause] Sammy learned that true courage [speak meaningfully] is not about being the biggest or strongest, [pause] but about caring for others. [speak with pride] The forest became a happier place because of his kindness.",
              },
            ],
          }),
        },
      ],
    },
  ],
});
