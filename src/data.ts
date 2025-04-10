import {ref} from "vue";

const data = {

  about0: "Experience the ultimate in relaxation and healing.",

  about1: "At Eternal Spa Healing and Wellness Center, we believe that true well-being begins with nurturing both body and mind. Our tranquil sanctuary provides a welcome escape from the stresses of everyday life.",

  about2: "Our team of certified professionals at Eternal Spa Healing and Wellness Center are passionate about empowering you to achieve optimal health. We've curated a peaceful haven, designed to promote deep relaxation and rejuvenation.",

  about3: "Eternal Spa is more than just a spa; it's a catalyst for lasting transformation. We believe in empowering you to cultivate sustainable wellness practices that extend far beyond your time with us.",

  aboutFull:"From the moment you enter Eternal Spa, our focus is on creating a deeply restorative experience tailored just for you. We go beyond surface-level pampering, delving into methods that encourage profound healing and equilibrium throughout your entire being. Our commitment is to provide treatments that offer tangible results, leaving you feeling not only relaxed but also more centered, clear, and energetically aligned. Allow us to guide you on a personalized journey towards reclaiming your vitality and inner peace in a supportive and nurturing environment.",

  aboutSpace:"Every element within Eternal Spa is intentionally curated to create an immediate sense of peace and calm upon arrival. Soft lighting, soothing textures, and a tranquil ambiance provide a genuine escape from the demands of daily life. This serene haven is designed to quiet your mind and prepare your body to fully receive the benefits of healing and deep relaxation.",
  aboutMission:"At Eternal Spa, we embrace a holistic philosophy, recognizing the intricate connection between mind, body, and spirit for true wellness. We thoughtfully integrate effective traditional wisdom with beneficial contemporary practices to address your unique needs comprehensively. This personalized approach fosters not just momentary calm, but aims to support lasting balance and transformation from within.",
  aboutTeam:"Our dedicated team consists of highly skilled, certified practitioners who are passionate about empowering your well-being journey. With attentive care and genuine warmth, they listen to your needs and apply their expertise to provide truly personalized treatments. Trust in their commitment to guide you towards profound relaxation, effective healing, and renewed vitality.",

  services: [
    {
      "name": "Red Light Therapy",
      "image": "/light-therapy2.jpg",
      "desc": "Red Light Therapy uses low-level red light wavelengths to stimulate cellular function, promoting healing, reducing inflammation, and improving skin health.",
      "id":0,
    },
    {
      "name": "Salt Bath",
      "image": "/salt1.jpg",
      "desc": "Salt baths utilize mineral-rich salts to relax muscles, detoxify the body, and soothe skin conditions, providing a calming and therapeutic experience.",
      "id":1,
    },
    {
      "name": "Massage Therapy",
      "image": "/massage1.jpg",
      "desc": "Massage Therapy involves manipulating soft tissues to relieve muscle tension, reduce stress, and promote relaxation and overall well-being.",
      "id":2,
    },
    {
      "name": "Hormone Replacement Therapy",
      "image": "/hrt/hrt3.jpg",
      "desc": "Hormone Replacement Therapy aims to balance hormone levels, alleviating symptoms associated with hormonal imbalances and improving quality of life.",
      "id":3,
    },
    {
      "name": "Acupuncture",
      "image": "/acupuncture1.jpg",
      "desc": "Acupuncture is a traditional Chinese medicine technique that involves inserting thin needles into specific points on the body to stimulate healing and relieve pain.",
      "id":4,
    },
    {
      "name": "Pulse Electronic Magnetic Frequency",
      "image": "/pemf1.jpg",
      "desc": "Pulse Electronic Magnetic Frequency therapy uses electromagnetic fields to stimulate cellular repair, reduce pain, and improve circulation.",
      "id":5,
    },
    {
      "name": "Float Tank Service",
      "image": "/float-tank1.jpg",
      "desc": "Float Tank Service involves floating in a sensory deprivation tank filled with Epsom salt water, promoting deep relaxation and stress reduction.",
      "id":6,
    },
    {
      "name": "Sound Therapy",
      "image": "/sound-therapy/sound-therapy3.jpg",
      "desc": "Sound Therapy uses specific frequencies and vibrations of sound to promote relaxation, reduce stress, and improve mental and emotional well-being.",
      "id":7,
    },
    {
      "name": "Hyperbaric Oxygen Treatment",
      "image": "/salt1.jpg",
      "desc": "Hyperbaric Oxygen Therapy involves breathing pure oxygen in a pressurized chamber, enhancing the body's natural healing process and promoting tissue repair.",
      "id":8,
    }
  ],

  podcasts:[
    {
      "name": "The Power of Breathwork for Stress Reduction",
      "desc": "Explore simple yet powerful breathwork techniques to calm your nervous system and reduce daily stress. Learn practical exercises you can incorporate into your routine.",
      "transcript": "All right. So, today we're taking a deep dive into something you do all the time without even thinking about it.\n" + "Breathing.\n" + "Exactly. Breathing.\n" + "Yeah.\n" + "We're really going to look at how simply being aware of your breath can help you deal with stress and just improve like your overall sense of well-being, right?\n" + "And you know, think about it like it's always there. Your breath, right?\n" + "It is. Yeah. It's always with us,\n" + "but we kind of just let it happen,\n" + "right? It's on autopilot most of the time.\n" + "Exactly. But all the research that we looked at for this deep dive Yeah.\n" + "Shows that there's some real power there when you actually start paying attention to it.\n" + "For sure. There's a huge potential when you kind of take control of your breath.\n" + "So, let's start with you know the listener like if you want to actually like start using your breath in this way.\n" + "Yeah.\n" + "How do you do that?\n" + "Well, I think the core of it the core idea is very simple really. You just bring your attention to your breath.\n" + "Okay.\n" + "Find like a comfortable position and just notice the feeling of the air as it goes in and out of your body.\n" + "Okay.\n" + "You can feel that gentle rise and fall of your chest. or your belly. At first, you don't even have to try to change anything. Just become aware of your natural breathing rhythm.\n" + "So, I can see where someone listening might be like, \"Okay, so I'm watching my breath go in and out, but like, how is that actually going to help me when I'm like, you know, really stressed out?\"\n" + "Right. Well, think about what happens in your body when you're stressed. Your breath tends to get really fast and shallow.\n" + "Oh, yeah. Okay.\n" + "So, if you consciously slow it down and like make your inhales and your exhales deeper and longer, you're actually sending a signal to your brain that everything's okay. It's safe. to relax.\n" + "That's interesting.\n" + "It's like hitting the brakes on that whole fightor-flight stress response.\n" + "So, I guess the next question then is like when can you actually use this? Are there times when it's like more helpful than others?\n" + "You know, that's the great thing about it is that you can use it pretty much anywhere.\n" + "Okay?\n" + "Like anytime you start to feel that stress creeping in, say you're feeling the pressure before a big meeting, just take a couple of those deep breaths or you're working on a really tough project and you notice that tension building up in your shoulders or your neck, just pause for a second and focus on your breath.\n" + "Okay. So, even just for like a minute or two, that can help.\n" + "Exactly. And if you make it a regular practice, you know, even a few minutes a day, it can really build up your resilience to stress over time.\n" + "So, it really sounds like the biggest takeaway here is how accessible this is. You don't need like any special equipment or a ton of time. You always have your breath with you.\n" + "Yeah, absolutely. Just by tuning into it and practicing some of these basic techniques, you can learn to handle those stressful moments so much better.\n" + "I like that.\n" + "And the really cool part is that this mindful breathing thing can keep growing with you as you get more comfortable with it. You might even find deeper levels of calm and well-being. It's a practice that can kind of evolve.\n" + "Wow. So, just to kind of bring it all together for everyone listening, even taking a few minutes here and there throughout your day to just notice your breath, that inb breath, that outreath could be a surprisingly powerful way to manage stress and find a little bit more peace.\n" + "I think so. I think that's a great way to put it. It's such a simple tool, but the effects can be really profound.\n" + "Yeah, that's amazing.\n" + "All right, thanks so much for diving into this with me today.\n" + "My pleasure.\n" + "And to you, the listener, we'll catch you on the next deep dive.",
      "uploadDate": 1712530800000,
      "guests": [],
      "tags": ["breathwork", "stress management", "relaxation", "mindfulness"],
      "file": "/audio/breathwork.wav",
      "image": "/spa/spa1.jpg",
      "featured":true,
      "id":0,
    },
    {
      "name": "Nourishing Your Skin From Within",
      "desc": "Discover the vital connection between nutrition and healthy, glowing skin. We discuss key nutrients, foods to embrace, and how your diet impacts your complexion.",
      "transcript": "[Speaker 1] Okay, so we all want that healthy skin, right? We've probably all tried, you know, tons of different products, but like what is the secret to amazing skin wasn't just, you know, what we put on it. Today, we're going deep on how what you eat affects the way your skin looks, and we're going to pull out all the most important stuff about this from the research we've done.\n[Speaker 2] Yeah. It's almost like you have to change your perspective, right? We tend to focus on what we can see and treat that, but healthy skin really starts way deeper than that.\n[Speaker 1] Yeah. Exactly. So, the main idea here is that good nutrition equals healthy skin.\n[Speaker 2] Like, think about it this way. Your skin cells are just like every other cell in your body. They're always renewing themselves and they need the right stuff to do that,\n[Speaker 1] right? Like they need building blocks.\n[Speaker 2] He's like, imagine your skin is a garden. You can spray the leaves with all kinds of stuff, but if the soil is no good, the plants are going to struggle.\n[Speaker 1] Yeah, that makes sense. So, we need to fertilize our skin from the inside out.\n[Speaker 2] Exactly. And the fertilizer is the nutrients from the food you eat.\n[Speaker 1] Okay. So, what are the key ingredients in this fert izer. Our research points to vitamins and minerals as a good place to start. And we're not going to get into specifics today, but it's clear that we need a wide range of these to keep our skin healthy.\n[Speaker 2] Yeah. And it's fascinating how these vitamins and minerals are involved in so many different processes that keep your skin working as well as it can. Like some vitamins help with cell repair and some minerals help give skin its structure.\n[Speaker 1] And of course, we've got to talk about antioxidants. They're everywhere these days. So, what exactly do they do for our skin?\n[Speaker 2] Okay, so think about it this way. Every day your skin is under attack from these things called free radicals. They come from pollution, stress, all that stuff. And antioxidants are like little bodyguards. They go around neutralizing those free radicals and that helps prevent damage that can make your skin age faster and look dull.\n[Speaker 1] So, it's like an army fighting off the bad guys.\n[Speaker 2] Exactly.\n[Speaker 1] Okay. And and then there's something so basic and we we often forget about it. Hydration. Our sources are very clear on this. You've got to stay hydrated for healthy skin.\n[Speaker 2] Oh, absolutely. Water is like the lifeblood of all your cells, including your skin cells. When you're drinking enough water, your skin is more elastic. It feels smoother and it can transport all those nutrients we talked about more effectively,\n[Speaker 1] right? Because it's all connected.\n[Speaker 2] Yeah. And when you're dehydrated, your skin gets dry and it just looks\n[Speaker 1] No one wants that. So, basically what we're hearing is that the best way to get all those vitamins and minerals, antioxidants,\n[Speaker 2] and that all important hydration is to eat a balanced diet full of whole foods.\n[Speaker 1] Exactly. It's not about finding that one magic food. It's about the combination of all those nutrients working together. When you eat a variety of whole foods, you're giving your skin everything it needs to be healthy and strong.\n[Speaker 2] And you can really see the difference, right? You know, when someone's eating well, their skin just has this healthy glow.\n[Speaker 1] Yeah. It's like you're seeing their inner health on the outside. Taking care of yourself isn't just about feeling good. It's about looking good, too. And it starts with your skin.\n[Speaker 2] So, to sum it all up, if you want radiant, healthy skin, You need to make sure you're eating plenty of whole foods, staying hydrated, and getting those antioxidants. It's not just an extra step. It's the foundation.\n[Speaker 1] It really is. True beauty starts from within.\n[Speaker 2] That's a great way to put it. So, here's something to think about as we wrap up our deep dive today. What's one small change you can make to your diet that will help you nourish your skin from the inside out?\n[Speaker 1] Yeah. What's one thing you could start doing today?\n[Speaker 2] It's all about taking those little steps, right?\n[Speaker 1] Absolutely.\n[Speaker 2] Awesome. Well, thanks for joining us. this deep dive into how to get that healthy glowing skin. We'll see you next time.\n[Speaker 1] See you later.",
      "uploadDate": 1712617200000,
      "guests": [],
      "tags": ["skin health", "nutrition", "diet", "wellness", "beauty"],
      "file": "/audio/skin_nutrition.wav",
      "image": "/spa/spa2.jpg",
      "featured":true,
      "id":1,
    },
    {
      "name": "The Benefits of Regular Gentle Movement",
      "desc": "We explore the profound benefits of incorporating gentle movement like walking, yoga, and stretching into your daily life for improved physical and mental well-being.",
      "transcript": "[Speaker 1] Welcome back everyone for another deep dive. And uh today we're going to be looking at something pretty interesting. Um\n[Speaker 2] yeah,\n[Speaker 1] the power of gentle movement.\n[Speaker 2] Absolutely.\n[Speaker 1] So kind of moving away from that idea that you need to be like,\n[Speaker 2] you know, really pushing yourself to the limit\n[Speaker 1] to uh to get, you know, the real health benefits that we're all looking for.\n[Speaker 2] Yeah.\n[Speaker 1] Um and we've got some sources this time that are really shining a light on um just simple things like brisk walking, gentle yoga, right?\n[Speaker 2] And consistent stretching\n[Speaker 1] as being like these surprisingly potent\n[Speaker 2] tools for well-being.\n[Speaker 1] I think it's really interesting when we look at this because it's sort of like we always think we got to be, you know, pushing it to the max. What we're really going to be diving into today is um why these like seemingly small, you know, everyday activities can actually have such a huge impact on how you feel both physically and mentally.\n[Speaker 2] So, it's kind of like\n[Speaker 1] getting into the science behind these mental approaches to fitness.\n[Speaker 2] Okay. So, let's unpack this a little bit.\n[Speaker 1] Yeah.\n[Speaker 2] Um what's one of the first things that even incorporating, you know, a little bit of gentle movement can do for us?\n[Speaker 1] So, one of the key benefits and they talk about this in the sources is um improved circulation.\n[Speaker 2] Okay?\n[Speaker 1] And um and so, you know, even low impact activities engage your muscles and uh and these contractions act like natural pumps, right? They're aiding the return of blood to your heart, right?\n[Speaker 2] And uh and so what's really fascinating about this is that consistent gentle movement um actually supports the health of your blood vessels. So, it's making that entire circulatory system more efficient over time.\n[Speaker 1] That's a great way to visualize it. You know, those muscles actually like helping things flow.\n[Speaker 2] Yeah, exactly.\n[Speaker 1] Okay. Um what about when we think about like just feeling less stiff,\n[Speaker 2] right?\n[Speaker 1] Um how does gentle movement factor into flexibility?\n[Speaker 2] So, um things like gentle yoga and regular stretching, you know, they're incredibly effective at um at improving and maintaining your range of motion. And um this isn't just about like you know being limber or whatever. It actually enhances your proprioception. So that's like your body's awareness of where it is in space.\n[Speaker 1] Oh, that's interesting.\n[Speaker 2] And so that contributes to better balance and a reduced risk of falls, which is obviously really important for long-term health.\n[Speaker 1] Yeah, totally. So it's about that mind body connection as well. Yeah.\n[Speaker 2] Not just the physical like stretch itself.\n[Speaker 1] Exactly.\n[Speaker 2] Okay. Um Now I know personally even a short walk can like really lift my spirits.\n[Speaker 1] Yeah.\n[Speaker 2] What's the link there?\n[Speaker 1] So the sources really emphasize this positive impact um of gentle activity on your mood.\n[Speaker 2] So when you engage in even a moderate physical activity um your body releases these neurochemicals okay\n[Speaker 1] um including endorphins of course and these have like mood boosting effects right? So um What's interesting is that consistent gentle movement can contribute to like a more stable and positive\n[Speaker 2] um emotional baseline over time. So, have you noticed that yourself?\n[Speaker 1] Oh, for sure.\n[Speaker 2] Yeah.\n[Speaker 1] Yeah. It's like a reliable pickme up.\n[Speaker 2] Totally.\n[Speaker 1] Okay. So, we're seeing these benefits for\n[Speaker 2] you our heart, our flexibility, our mood.\n[Speaker 1] Is there like a central principle that makes\n[Speaker 2] gentle movement so effective?\n[Speaker 1] So, I think the core principle here is consistency.\n[Speaker 2] Okay.\n[Speaker 1] Um The sources really strongly suggest that engaging in even you know just a little bit of gentle movement but\n[Speaker 2] regularly\n[Speaker 1] yeah\n[Speaker 2] yields far greater benefits for overall well-being than like those sporadic intense workouts.\n[Speaker 1] Oh okay.\n[Speaker 2] So it's about creating sustainable habits that become integrated into your daily life.\n[Speaker 1] Right. So it's that steady accumulation small efforts.\n[Speaker 2] Yes.\n[Speaker 1] Got it. Okay. So for you listening\n[Speaker 2] we've seen how incorporating things like you know a brisk walk\n[Speaker 1] Yeah. Some yoga, regular stretching can lead to like these tangible improvements in your circulation, flexibility, and even your mood.\n[Speaker 2] Absolutely. And one thing to really remember here is to find activities that you genuinely enjoy and that you can realistically maintain over the long term. You know, it doesn't need to be this grueling workout to be beneficial, right?\n[Speaker 1] The key is consistent engagement.\n[Speaker 2] Absolutely. It's about making movement a joyful part of your routine. Exactly.\n[Speaker 1] Not a chore.\n[Speaker 2] Right.\n[Speaker 1] Okay. So, here's something to consider.\n[Speaker 2] Yeah.\n[Speaker 1] What's one small enjoyable way\n[Speaker 2] that you could weave a little more movement into your day?\n[Speaker 1] Yeah.\n[Speaker 2] Starting today.\n[Speaker 1] It could be anything.\n[Speaker 2] What's that one tiny step you can take right now,\n[Speaker 1] right,\n[Speaker 2] to begin experiencing these benefits for yourself?\n[Speaker 1] That's the question.\n[Speaker 2] I like it.\n[Speaker 1] Food for thought.\n[Speaker 2] Thanks for joining us for another deep dive.\n[Speaker 1] Absolutely.\n[Speaker 2] Catch you next time.\n[Speaker 1] See you.",
      "uploadDate": 1712703600000,
      "guests": [],
      "tags": ["exercise", "yoga", "stretching", "well-being", "physical health"],
      "file": "/audio/gentle_movement.wav",
      "image": "/spa/spa3.jpg",
      "featured":false,
      "id":2,
    },
    {
      "name": "Understanding and Managing Sleep Hygiene",
      "desc": "Learn practical strategies to improve your sleep quality by understanding the principles of good sleep hygiene and creating a restful bedtime routine.",
      "transcript": "[Speaker 1] Okay. So, we all know sleep is important, right?\n[Speaker 2] Absolutely.\n[Speaker 1] But we're busy. We're all busy and sometimes it feels like\n[Speaker 2] it's the first thing to go. Yeah.\n[Speaker 1] It's the first to go, right? We push it off. Um so, today we're going to really do a deep dive into why that might not be the best idea,\n[Speaker 2] right?\n[Speaker 1] We have a whole bunch of different sources. Um really kind of looking at this idea of sleep hygiene, um and how that impacts our physical and our mental health. And we want to pull out some stuff for you, right?\n[Speaker 2] Yeah, absolutely.\n[Speaker 1] Just the why, but like the how\n[Speaker 2] exactly the key takeaways that people can actually implement in their own lives to really improve things.\n[Speaker 1] Yeah. So, so this whole idea of sleep hygiene um what's the what's the core concept there?\n[Speaker 2] So, basically sleep hygiene is about putting in place uh kind of the habits and the environment to really set yourself up for success with sleep.\n[Speaker 1] Okay?\n[Speaker 2] You know, it's not just about like how many hours you're clocking, but it's about creating the right conditions for quality sleep and you know she said supporting both your physical and mental health.\n[Speaker 1] I see. I see.\n[Speaker 2] So there are a bunch of different elements that that go into this.\n[Speaker 1] Okay. Yeah. So so walk me through some of the the biggest ones that stood out to you from the research.\n[Speaker 2] Yeah. So one of the most important and actually one of the simplest is establishing a regular sleep schedule.\n[Speaker 1] Okay. So like going to bed waking up around the same time each day.\n[Speaker 2] Exactly. And and you know it sounds so basic but honestly that consistency is huge.\n[Speaker 1] Our bodies thrive on routine and you know our internal clock, our circadian rhythm, it gets really thrown off by even like small shifts in our sleepwake cycle.\n[Speaker 2] Really? So even like an hour difference makes a difference.\n[Speaker 1] Yeah. I mean one of the studies we looked at showed that like even an hour difference on the weekends\n[Speaker 2] Oh wow.\n[Speaker 1] can actually impact your cognitive function during the week.\n[Speaker 2] That's wild. I would have thought our bodies are more resilient than that.\n[Speaker 1] You'd think so, right? But it turns out our internal clocks are pretty sensitive. Okay. So, consistency is key. Got it.\n[Speaker 2] Absolutely. And then another really big one is the sleep environment itself,\n[Speaker 1] right? So, we're not just talking about any old\n[Speaker 2] Nope. It's about creating a space that really promotes sleep.\n[Speaker 1] A sanctuary.\n[Speaker 2] Yeah. Exactly. Like a sleep sanctuary.\n[Speaker 1] I love it.\n[Speaker 2] And the key factors there are darkness, quiet, and temperature.\n[Speaker 1] So, like blackout curtains.\n[Speaker 2] Blackout curtains, earplugs if you need them, and keeping the room a little bit cooler than you might during the day.\n[Speaker 1] Interesting.\n[Speaker 2] Yeah. Cool, dark room helps signal to your body that it's time to produce melatonin. Yeah.\n[Speaker 1] Which is that hormone that helps regulate your sleep cycle.\n[Speaker 2] It's like setting the scene, right? Like your body's getting these cues that it's time to wind down.\n[Speaker 1] Exactly. It's all about minimizing those distractions and creating that ideal sleep environment.\n[Speaker 2] Got it. Okay. So, consistent sleep schedule, the right sleep environment. Right. What else?\n[Speaker 1] So, another really important piece of the puzzle is what you do before bed. Those pre-bedtime habits.\n[Speaker 2] Yeah. What are we doing in that like hour or two before we actually hit a pillow.\n[Speaker 1] Exactly. And here again, it's about consistency and routine. Okay.\n[Speaker 2] And calming activities. So things like reading,\n[Speaker 1] taking a warm bath, light, stretching those can all really help prep your body and mind for sleep.\n[Speaker 2] So what are we avoiding?\n[Speaker 1] Definitely avoid intense workouts right before bed or watching like a really suspenseful movie.\n[Speaker 2] Yeah. No thrillers right before bed.\n[Speaker 1] Exactly. And huge one, minimize screen time.\n[Speaker 2] Oh, the blue light.\n[Speaker 1] Yeah. That blue light that's emitted from phones, tablets, computers. It messes with your melatonin production.\n[Speaker 2] So, it's like telling your brain it's still daytime.\n[Speaker 1] Exactly. And that makes it so much harder to fall asleep and stay asleep.\n[Speaker 2] This is all making me realize my bedtime routine could use some work.\n[Speaker 1] Well, you're not alone.\n[Speaker 2] Okay, so we've got our routine. We've got our sleep sanctuary. What's the big payoff here?\n[Speaker 1] So, this is where it gets really interesting.\n[Speaker 2] Okay,\n[Speaker 1] our sources all point to a strong link between good sleep hygiene and overall health improvement.\n[Speaker 2] So, it's not just about feeling less tired,\n[Speaker 1] right? It's about so much more than that. We're talking about better mood regulation, improved focus, a stronger immune system.\n[Speaker 2] Wow. So, it's really impacting every aspect of our well-being.\n[Speaker 1] Exactly. One of the studies we looked at actually showed a connection between consistent sleep schedules and a reduced risk of certain metabolic disorders.\n[Speaker 2] So, this isn't just about feeling good. It's about preventing serious health problems down the line.\n[Speaker 1] Exactly. Sleep is an investment in your long-term health.\n[Speaker 2] It's not a luxury. It's a necessity.\n[Speaker 1] Exactly.\n[Speaker 2] All right. So, For everyone listening out there, what's the the one key takeaway you want them to walk away with?\n[Speaker 1] The key takeaway is that small consistent changes to your sleep habits and environment can make a huge difference in how you feel and function.\n[Speaker 2] Huge.\n[Speaker 1] Prioritizing restful sleep is one of the best things you can do for your physical and mental health.\n[Speaker 2] And I think that leads to a final thought for everyone listening. Thinking about everything we've talked about tonight, what's one small adjustment you can make to your evening routine? starting tonight.\n[Speaker 1] Yeah. Just one thing that will signal to your body and mind that it's time to rest and recharge.\n[Speaker 2] What will it be?",
      "uploadDate": 1712790000000,
      "guests": [],
      "tags": ["sleep hygiene", "sleep quality", "rest", "wellness", "mental health"],
      "file": "/audio/sleep_hygiene.wav",
      "image": "/sleep/sleep2.jpg",
      "featured": true,
      "id":3,
    },
    {
      "name": "The Art of Self-Compassion",
      "desc": "Explore the concept of self-compassion and learn how to treat yourself with kindness and understanding, especially during challenging times.",
      "transcript":"[Speaker 1] Okay, so today we're doing a deep dive into self-compassion and uh we're taking a look at an excerpt from Wellness Insights for this one,\n[Speaker 2] right?\n[Speaker 1] Um and and really made me think about how we're so often much harder on ourselves than we are on other people.\n[Speaker 2] Yeah, that's definitely true.\n[Speaker 1] But I think a lot of people experience that.\n[Speaker 2] So what we really want to explore today is why is that? And how can we kind of bridge that gap? Yeah.\n[Speaker 1] Um and really what does it actually mean to be self-compassionate?\n[Speaker 2] It's so interesting, isn't it? This like this almost like knee-jerk reaction to criticize ourselves, you know.\n[Speaker 1] And so what we want to do is sort of look at the elements of what can help us be more supportive, you know, to ourselves and move away from that sort of inner critic that's always putting us down.\n[Speaker 2] Yeah. It's like that inner voice that's like so mean.\n[Speaker 1] Exactly.\n[Speaker 2] Um okay, so let's get into it. First off, uh self-kindness.\n[Speaker 1] Yeah.\n[Speaker 2] Um wellness insights, put it really simply.\n[Speaker 1] Yeah.\n[Speaker 2] Um being gentle and understanding ing with ourselves when we mess up instead of going straight to,\n[Speaker 1] you know, blaming ourselves,\n[Speaker 2] right?\n[Speaker 1] Um,\n[Speaker 2] so think about like the last time you made a mistake, right? Did you like talk to yourself like you would talk to a friend or were you just like super hard on yourself?\n[Speaker 1] Exactly. And I think what's really important to to remember here is that this gentleness isn't about letting ourselves off the hook,\n[Speaker 2] you know? It's about offering ourselves the same understanding that we would offer someone we care about if they were going through do the same thing.\n[Speaker 1] Yeah, totally. I think that's such a good point.\n[Speaker 2] Mhm.\n[Speaker 1] Okay, so moving on to the next piece of this\n[Speaker 2] common humanity.\n[Speaker 1] Yeah,\n[Speaker 2] the exel kind of makes this point that like\n[Speaker 1] those feelings we get, right? Like of failure or feeling inadequate.\n[Speaker 2] Yeah.\n[Speaker 1] Like they're not just you.\n[Speaker 2] Like everybody goes through them.\n[Speaker 1] Totally.\n[Speaker 2] It's part of being human.\n[Speaker 1] Yeah. And I think that's a really powerful realization, you know, that these struggles that we have aren't unique to us. kind of takes you from feeling alone in it to understanding that you're part of something bigger and it's just a normal part of life,\n[Speaker 2] right? It's not like a personal failing.\n[Speaker 1] Exactly.\n[Speaker 2] Yes. It's like part of being alive.\n[Speaker 1] Totally.\n[Speaker 2] Okay. And then there's mindfulness.\n[Speaker 1] Yes.\n[Speaker 2] Now, this one isn't about like pushing away any bad thoughts that we have,\n[Speaker 1] right?\n[Speaker 2] But it's more about noticing them without letting them totally take\n[Speaker 1] take over. You know, Wellness Insights talks about being open to these feelings almost like you're watching them from the outside. Yeah, it's interesting how mindfulness can create a space between us and our thoughts, you know, so instead of going into that like spiral of self-criticism when a negative thought pops up, we can just sort of see it there without judging it.\n[Speaker 2] Yeah. Almost like it's a cloud passing by or something.\n[Speaker 1] Exactly.\n[Speaker 2] Yeah. You don't have to like grab on to it,\n[Speaker 1] right?\n[Speaker 2] Okay. So, with all of this, how does being self-compassionate actually help people? Like what's in it for them?\n[Speaker 1] Well,\n[Speaker 2] wellness insights mentioned and some pretty big benefits.\n[Speaker 1] Yeah.\n[Speaker 2] So, basically building up these three things that we've talked about, you know, self-kindness,\n[Speaker 1] common humanity, and mindfulness.\n[Speaker 2] Yeah.\n[Speaker 1] It can really make you more resilient and improve your well-being overall.\n[Speaker 2] Yeah, that makes sense. Because when you're not constantly beating yourself up, you're going to be more equipped to deal with the ups and downs of life, you know?\n[Speaker 1] Totally.\n[Speaker 2] Yeah. And it's like when we're kinder to ourselves and we recognize that everybody's imperfect,\n[Speaker 1] we're building up a sort of a stronger base for dealing with challenges and that can help us be more emotionally stable and it can make us feel more positive in general.\n[Speaker 2] Right. So, it's like a positive feedback loop.\n[Speaker 1] Exactly.\n[Speaker 2] Okay. So, to sum up everything we've talked about,\n[Speaker 1] okay,\n[Speaker 2] self-compassion comes down to these three key ideas.\n[Speaker 1] Y\n[Speaker 2] treating ourselves kindly,\n[Speaker 1] realizing that we're all in this together with our imperfections.\n[Speaker 2] Yeah.\n[Speaker 1] And being mindful of our experiences without judgment.\n[Speaker 2] It's like building inner strength through understanding ourselves better.\n[Speaker 1] I like that.\n[Speaker 2] Yeah.\n[Speaker 1] So, here's something to think about. You know, as we wrap up, think about a time recently when you were really critical of yourself.\n[Speaker 2] And how might you have handled that situation differently if you'd had a bit more self-compassion?\n[Speaker 1] Yeah.\n[Speaker 2] Maybe a little more kindness, you know, remembering that everyone makes mistakes,\n[Speaker 1] right?\n[Speaker 2] Just something to consider.\n[Speaker 1] Food for thought.\n[Speaker 2] Yeah. Food for thought. All right.\n[Speaker 1] Okay.\n[Speaker 2] That's it for this deep dive.\n[Speaker 1] Great talking about this.\n[Speaker 2] Yeah, me too. Thanks for joining me.\n[Speaker 1] You're welcome.\n[Speaker 2] And everyone listening, we'll see you next time.\n[Speaker 1] Bye.",
      "uploadDate": 1712876400000,
      "guests": [],
      "tags": ["self-compassion", "mental health", "emotional well-being", "mindfulness", "self-care"],
      "file": "/audio/self_compassion.wav",
      "image": "/spa/spa5.jpg",
      "featured": false,
      "id":4,
    },
    {
      "name": "Hydration Habits for Optimal Health",
      "desc": "Understand the vital role of water in our bodies and learn practical tips for staying adequately hydrated throughout the day for optimal health and energy levels.",
      "transcript": "Welcome back to the deep dive. Ready to explore another fascinating facet of well-being.\n[Speaker 1] Always. Let's jump in.\n[Speaker 2] All right, so today we're taking a look at, you know, something really basic but super important. Hydration. We're using wellness insights as our guide today.\n[Speaker 1] Yeah. Seems like everyone's always talking about the latest, greatest health trends, but wellness insights really brings us back to the fundamentals.\n[Speaker 2] Absolutely. And it's easy to forget just how crucial water is. Not just, oh, I'm I'm thirsty. But for like every single thing your body does,\n[Speaker 1] right? You know, even though we all know we should drink water, it's easy to slip up, right?\n[Speaker 2] Totally. Busy day, you get caught up in things and uh suddenly you realize you haven't had a sip in hours.\n[Speaker 1] Exactly. And Wellness Insights points out that even mild dehydration can throw things off. Energy levels, how your body processes nutrients, you name it.\n[Speaker 2] Yeah, they really stress that, huh? Like even though it's simple, we shouldn't underestimate it\n[Speaker 1] for sure. And there's so many benefits to being properly dehydrated.\n[Speaker 2] Oh yeah, for sure. Like I know when I'm drinking enough water, I just feel better overall, more energy, my skin looks better, I'm more focused.\n[Speaker 1] Absolutely. And Wellness Insights dives into that, talking about how like it helps your body function at its best. From your cells to your organs, everything needs water.\n[Speaker 2] So it's kind of like the foundation of everything else. You know, if you're not getting enough water,\n[Speaker 1] nothing else can really work as well.\n[Speaker 2] Exactly. It's almost like the oil in a car, right? Keeps everything running smoothly.\n[Speaker 1] Perfect. technology. So, how about some practical advice from Wellness Insights on how to actually drink more water. What do they suggest?\n[Speaker 2] Well, they have some really simple, easy to implement tips. For example, keeping a water bottle visible can be a great visual cue. Like, keep one on your desk, in your car, wherever you spend a lot of time. Just seeing it can remind you to take a sip.\n[Speaker 1] Oh, I do. That totally works. Out of sight, out of mind. Right.\n[Speaker 2] Right. They also suggest, you know, not chugging a whole glass at once, but instead aiming for regular sips throughout the day. like take a few sips every hour or so.\n[Speaker 1] Yeah, that's way more sustainable than trying to like down a liter all at once. I've tried that before. Not fun.\n[Speaker 2] Not fun at all. Another tip from Wellness Insights is to add natural flavors. If plain water feels a bit boring, try adding slices of fruit, cucumber, or even herbs. It can make it a lot more enjoyable.\n[Speaker 1] That's a great idea. Sometimes I get tired of plain water.\n[Speaker 2] Me, too. And that's totally fine. Wellness Insights is all about finding ways to make hydration work. for you.\n[Speaker 1] So, it's not about forcing yourself to drink a certain amount, but more about finding what works for your lifestyle and making it a habit.\n[Speaker 2] Precisely. Small, sustainable changes that you can stick with in the long run.\n[Speaker 1] And ultimately, that's what Wellness Insights emphasizes, right? Consistent hydration as a simple yet powerful way to support your overall health and well-being.\n[Speaker 2] Exactly. It's not a quick fix or a magic bullet. It's a fundamental element of self-care. And just like any other healthy habit, the key is to find what works. for you and make it a part of your daily routine.\n[Speaker 1] Absolutely. So, listeners, think about how you can make hydration a bigger part of your life. It really is the foundation of so much.\n[Speaker 2] I'd even add, don't just think about it, try it. See how you feel after a week of really focusing on drinking more water. You might be surprised by the difference it makes.\n[Speaker 1] Great advice. Thanks for joining me on this deep dive into hydration. Until next time.",
      "uploadDate": 1712962800000,
      "guests": [],
      "tags": ["hydration", "water intake", "wellness", "energy"],
      "file": "/audio/hydration.wav",
      "image": "/spa/spa6.jpg",
      "featured": false,
      "id":5,
    }
  ],

  events:[
    {
      "name": "Mindful Morning Yoga",
      "desc": "Start your day with gentle stretches and mindful breathing techniques to enhance focus and reduce stress.",
      "location": "Tranquil Garden Studio",
      "address":"1024 E Main Street, Trinidad CO 81082",
      "time": 1744886400000,
      "end_time":1745406800000,
      "image": "/yoga/yoga1.jpg",
      "id":0,
      "descFull": "Begin your day with our Mindful Morning Yoga session, a practice designed to gently awaken your body and calm your mind. Through a series of carefully curated stretches, you'll improve flexibility and joint mobility. The session also incorporates mindful breathing exercises, helping you to center yourself and reduce any lingering stress. This class is perfect for all levels, whether you're new to yoga or have an established practice. Leave feeling refreshed, focused, and ready to embrace the day with a sense of inner peace."
    },
    {
      "name": "Gentle Flow Pilates for Core Strength",
      "desc": "Build core strength and improve flexibility with a gentle and mindful Pilates session suitable for all levels.",
      "location": "Movement Arts Studio",
      "address":"1024 E Main Street, Trinidad CO 81082",
      "time": 1744886400000,
      "end_time":1745406800000,
      "image": "/spa/spa5.jpg",
      "id":1,
      "descFull": "Our Gentle Flow Pilates class focuses on building a strong core and enhancing your overall flexibility through controlled and mindful movements. This session emphasizes proper alignment and technique, making it an excellent choice for individuals of all fitness levels. You will learn fundamental Pilates principles and exercises that target deep core muscles, leading to improved posture and stability. The gentle flow of the class ensures a low-impact workout that is both effective and accessible. Experience the benefits of increased body awareness and a stronger, more flexible you."
    },
    {
      "name": "Nourishing Your Body: A Nutrition Workshop",
      "desc": "Learn practical tips for healthy eating, meal planning, and understanding the power of whole foods.",
      "location": "Wellness Seminar Room",
      "address":"1024 E Main Street, Trinidad CO 81082",
      "time": 1745059200000,
      "end_time":1745406800000,
      "image": "/food/food6.jpg",
      "id":2,
      "descFull": "Join our informative Nutrition Workshop to gain valuable insights into the world of healthy eating. This session provides practical tips and strategies for creating balanced meals and effective meal plans. You will learn about the essential nutrients your body needs and how to incorporate more whole, unprocessed foods into your daily diet. Our expert will demystify common nutrition myths and empower you to make informed choices that support your overall well-being and energy levels. Discover the power of food as medicine and take control of your health through mindful eating habits."
    },
    {
      "name": "Relax and Restore Sound Bath",
      "desc": "Immerse yourself in the soothing vibrations of singing bowls and other instruments for deep relaxation and inner peace.",
      "location": "Serenity Sanctuary",
      "address":"1024 E Main Street, Trinidad CO 81082",
      "time": 1745145600000,
      "end_time":1745406800000,
      "image": "/sound-therapy/sound-therapy1.jpg",
      "id":3,
      "descFull": "Experience profound relaxation and a sense of inner peace during our Relax and Restore Sound Bath. This unique session involves being bathed in the resonant frequencies of various instruments, including singing bowls, gongs, and chimes. These sounds create a deeply calming and meditative environment, helping to reduce stress and promote a state of tranquility. Simply lie down comfortably and allow the vibrations to wash over you, easing tension and fostering a sense of well-being. This is a passive yet powerful way to reset your nervous system and find deep relaxation."
    },
    {
      "name": "Guided Nature Walk & Forest Bathing",
      "desc": "Reconnect with nature through a slow-paced walk, engaging your senses to experience the calming benefits of the natural environment.",
      "location": "Local Nature Preserve Trail",
      "address":"1024 E Main Street, Trinidad CO 81082",
      "time": 1745232000000,
      "end_time":1745406800000,
      "image": "/forest/walk2.jpg",
      "id":4,
      "descFull": "Embark on a rejuvenating journey with our Guided Nature Walk and Forest Bathing experience. This slow-paced walk encourages you to mindfully engage all your senses as you immerse yourself in the natural surroundings. Forest bathing, or Shinrin-Yoku, is a Japanese practice known for its stress-reducing and mood-boosting benefits. Our guide will offer gentle prompts to help you connect with the sights, sounds, smells, and textures of the forest. Allow the tranquility of nature to soothe your mind and revitalize your spirit. This is an opportunity to slow down, breathe deeply, and rediscover the calming power of the natural world."
    },
    {
      "name": "Stress Management & Meditation Techniques",
      "desc": "Discover effective strategies for managing daily stress and learn simple yet powerful meditation practices.",
      "location": "Harmony Hall",
      "address":"1024 E Main Street, Trinidad CO 81082",
      "time": 1745318400000,
      "end_time":1745406800000,
      "image": "/yoga/yoga2.jpg",
      "id":5,
      "descFull": "In our Stress Management & Meditation Techniques workshop, you will learn practical and effective strategies to navigate the challenges of daily stress. Our experienced instructor will guide you through various relaxation techniques and introduce you to simple yet powerful meditation practices. Discover how to cultivate mindfulness, reduce anxiety, and improve your overall well-being through these accessible tools. This session is designed for anyone seeking to better manage stress and incorporate moments of calm into their busy lives. Leave with a toolkit of techniques you can use anytime, anywhere, to promote a greater sense of balance and peace."
    },
    {
      "name": "DIY Aromatherapy Blends for Wellness",
      "desc": "Explore the world of essential oils and create your own personalized aromatherapy blends for relaxation, energy, and more.",
      "location": "Aroma Workshop Space",
      "address":"1024 E Main Street, Trinidad CO 81082",
      "time": 1745404800000,
      "end_time":1745406800000,
      "image": "/spa/spa3.jpg",
      "id":6,
      "descFull": "Delve into the fragrant world of essential oils in our DIY Aromatherapy Blends for Wellness workshop. You will learn about the properties and benefits of various essential oils and how to safely blend them to create personalized aromatherapy products. Our instructor will guide you through the process of making blends for relaxation, energy boosting, sleep support, and more. You'll have the opportunity to create and take home your own unique aromatherapy blends. Discover the therapeutic power of natural scents and enhance your well-being through the art of aromatherapy."
    }
  ],

  bookings:[

    {
      id:0,
      serviceType:"massage therapy",
      serviceId:'',
      specialistId:'',
      timeslot:"April 10, 2025 11:00:00",
      selected: ref(false),
    },

    {
      id:1,
      serviceType:"massage therapy",
      serviceId:'',
      specialistId:'',
      timeslot:"April 10, 2025 12:00:00",
      selected: ref(false),
    },

    {
      id:2,
      serviceType:"massage therapy",
      serviceId:'',
      specialistId:'',
      timeslot:"April 11, 2025 14:00:00",
      selected: ref(false),
    },

    {
      id:3,
      serviceType:"float tank service",
      serviceId:'',
      specialistId:'',
      timeslot:"April 11, 2025 11:00:00",
      selected: ref(false),
    },

    {
      id:4,
      serviceType:"float tank service",
      serviceId:'',
      specialistId:'',
      timeslot:"April 12, 2025 11:00:00",
      selected: ref(false),
    },

    {
      id:5,
      serviceType:"acupuncture",
      serviceId:'',
      specialistId:'',
      timeslot:"April 13, 2025 11:00:00",
      selected: ref(false),
    },

  ],

}

export default data;
