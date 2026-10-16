# Sukliii

💗 Build a Romantic Interactive Birthday Surprise Website for My Sukliiii 💋



Create a stunning, fully responsive, interactive romantic birthday surprise website for my love, Sukliiii. This website is a special virtual birthday gift from his loving partner. Use this Instagram Reel as visual inspiration for the overall interactive experience: https://www.instagram.com/reel/DaJhHycKXce/?srtk=bXY1NzA3dnh1eHNz



The website must feel like a cute anime-inspired romantic adventure, combining a playful love game, magical transitions, and a heartfelt birthday surprise. Every screen should feel special, with surprises revealed through user interactions rather than displaying everything at once.



🎀 1. Global Theme and Visual Design



Use a consistent black-and-pink romantic aesthetic throughout the entire website.



Color palette



- Main background: "#050505"

- Secondary background: "#100711"

- Hot pink: "#FF1493"

- Romantic pink: "#FF69B4"

- Light pink: "#FFC0DB"

- Soft white: "#FFF5FA"

- Pink glow: "#FF85C8"



Visual direction



- Pure black and deep-purple-black backgrounds.

- Hundreds of small glowing pink hearts floating at different speeds.

- Cute anime cats with sparkling eyes, blushing cheeks, and heart accessories.

- Neon-pink buttons with glowing borders and smooth hover effects.

- Romantic handwritten typography for love messages.

- Elegant rounded typography for instructions and buttons.

- Sparkles, floating petals, glitter, and heart-shaped particles.

- Smooth cinematic transitions between pages.

- Cute animations that feel soft, romantic, and playful rather than childish.

- Beautiful mobile layout that works perfectly on Android and iPhone screens.



Create each stage as a separate full-screen scene or a properly managed single-page application state. Do not display all stages simultaneously. Every scene must have working buttons, functioning interactions, and appropriate animations.



Add an optional romantic background music toggle, sound effects, and a persistent mute button. Do not force audio playback before user interaction.



---



🐱 2. Scene One — The Cute Cat Invitation



Create a magical opening screen with a black background, pink glowing hearts, and a cute anime kitten sitting in the center.



The cat should have:



- Large sparkling eyes.

- Pink blush on both cheeks.

- A little heart on its head or near its paws.

- A cute bouncing animation.

- Occasional blinking and a subtle tail movement.



Display this text with a gentle typing animation:



“Heyyy Sukliiii! 🥺💗”



“I made something special just for uuu…”



“Do you want to see it? 🎁💋”



Below the message, display two buttons:



💖 YESSS, SHOW ME!



🙈 NOOO



Make the No Button a Funny Trap



This is a playful romantic interaction. Every time he clicks NO:



1. Display a different funny, affectionate message.

2. Make the YES button grow progressively larger.

3. Make the NO button progressively smaller.

4. Add a burst of pink hearts.

5. Make the anime cat react with different expressions.



Use messages such as:



- “Wrong option, Sukliiii! 😾💕”

- “Ehhh? You don't wanna see my surprise? 🥺”

- “Try again, baby! The other button is waitinggg 💋”

- “Nice try, cutie! 😂💗”

- “Sukliiii, don't break my heart already! 😭💘”

- “There's only ONE correct answer, babyyyy! 😼”

- “Hehehe, YES is getting bigger! 💖”

- “Caught you! Now click YES, my love! 🫶”



Make the NO button smaller with every click until it becomes tiny but still visible. Make the YES button increasingly large and prominent, with a gentle pulse and glow. Keep the interaction funny and affectionate.



When he clicks YES, trigger a full-screen heart explosion, a quick pink flash, and a smooth transition to the next scene.



---



💕 3. Scene Two — “You're Such a Sweetheart!”



Display a glowing pink heart in the center, surrounded by floating hearts and sparkles.



Show the message:



“Awww, you're such a sweetheart! 🥹💗”



“Knew you would say yes, Sukliiii!”



“But waittt… before you see your surprise…”



“I need you to complete a tiny love mission! 😼💘”



Display a glowing button:



LET'S PLAY, BABYYY! 💋



On click, transition to the heart-and-arrow game.



---



🏹 4. Scene Three — Aim for My Heart



Create a beautiful interactive mini-game on a black background with glowing pink particles.



At the top, display:



“One tiny mission for you, Sukliiii! 💘”



“Drag the arrow, aim at my heart, and let it fly!”



Game Layout



- Position a glowing pink heart target on the RIGHT side of the screen.

- Position a cute, draggable arrow on the LEFT side.

- Place the arrow on a small bow or launch point.

- Show a dotted trajectory line when the player drags the arrow.

- Use a large, clearly visible heart target with a bright outline and pulsing animation.

- Add subtle target movement or a gentle floating effect for extra challenge.



Drag-and-Release Mechanics



Implement a real, functional drag-and-release game using pointer events or an equivalent touch-friendly interaction.



1. The player can drag the arrow to adjust its angle and launch direction.

2. Display a trajectory preview while dragging.

3. When the player releases the arrow, animate it travelling along the aimed trajectory.

4. If the arrow intersects the heart's hitbox, trigger a successful hit.

5. If the arrow misses, animate it passing the target or falling away, then return it to the launch position.

6. Allow unlimited attempts until the heart is successfully hit.

7. Show the attempt counter, such as “Attempt 1”, “Attempt 2”, and so on.

8. Give helpful, playful feedback after a miss.



Example miss messages:



- “Oopsss! You missed my heart! Try again, baby! 😭💗”

- “A little to the right, Sukliiii! 🎯”

- “Hehehe, my heart is slippery! 😼💘”

- “One more try, my love! You got this! 🫶”



Ensure the game works with both mouse dragging and touch dragging on mobile. Use actual collision detection instead of automatically declaring a hit after a random attempt.



Successful Heart Hit



When the arrow passes through the heart:



- Freeze the arrow briefly in the heart.

- Make the heart shake gently and glow intensely.

- Create an explosion of pink hearts and glitter.

- Play a soft romantic success sound if audio is enabled.

- Animate the heart breaking into little sparkles and reforming as a larger heart.



Display the message with a dramatic reveal:



“OMG 😱 YOU ATTACKED MY HEART!!! 💘”



“Look what you did, Sukliiii…”



“You made me fall for you even more! 🥹💕”



“My heart was supposed to be safe… but you stole it completely! 😭💋”



“Now you're responsible for keeping it foreverrr. Deal? 🤭💖”



Add a button:



CONTINUE, MY HEART THIEF! 💗



Clicking it leads to the next scene.



---



💋 5. Scene Four — The Flying Kisses Challenge



Create a new full-screen scene with a black background and pink hearts.



Show the message:



“Sukliiii, do you want to see the next surprise? 🥺💌”



Provide two buttons:



YESSS, MY LOVE! 💖



NOOO 🙈



Funny Vanishing No Button



When the player clicks NO:



- Make the NO button disappear instantly.

- Make it reappear at a random position within the safe boundaries of the screen.

- Ensure it never appears outside the viewport or over important text.

- Add a tiny bounce animation when it reappears.

- Display playful messages such as:

  - “Hehehe, not that easy, baby! 😼”

  - “Are you sure, Sukliiii? 🥺💕”

  - “My kisses are waiting for youuu! 💋”

  - “Wrong button againnn! 😂💗”

  - “You can't escape my love! 🫶”



Allow him to try clicking NO repeatedly, with the button continuing to relocate.



When he clicks YES, trigger the flying-kisses transition.



Flying Kisses Transition



Fill the screen with dozens of animated kiss emojis: 💋 😘 💋 😘 💋



Make them fly from different directions, rotate, scale, and float across the screen. Add pink hearts and sparkles among the kisses.



Use a smooth, approximately 2–3 second transition before revealing the birthday cake scene. Ensure animations are lightweight and work well on mobile.



---



🎂 6. Scene Five — The Birthday Cake



Reveal a gorgeous birthday cake in the center of a black background decorated with glowing pink hearts.



The cake should have:



- Three-dimensional or beautifully illustrated pink-and-white frosting.

- Pink icing decorations and little hearts.

- Burning candles with animated flames.

- Soft candlelight and a pink glow beneath the cake.

- Floating sparkles and confetti.



Use a CSS cake illustration, SVG artwork, or a suitable animated illustration. The candles must be visually clear and the flame animation must be smooth.



Display:



“It's your special day, Sukliiii! 🎂💗”



“Make a wish, my love… ✨”



Then show a large animated countdown:



3… 2… 1…



After the countdown, display:



“Now blow the candles, babyyyy! 🥺🕯️”



Functional Candle-Blowing Interaction



Support two ways to blow out the candles:



Option A — Microphone: Ask for microphone permission only when the user taps a microphone button. If permission is granted, detect a sufficiently strong blowing sound or sustained loud airflow-like sound and extinguish the candle flames. Handle denied permission gracefully.



Option B — Touch-friendly fallback: Provide a visible “BLOW 💨” button so the experience works without a microphone. Also allow a long press or repeated taps to trigger the blowing animation.



When the candles are blown out:



- Extinguish all candle flames.

- Animate little smoke wisps rising from each wick.

- Dim the candlelight.

- Trigger a burst of pink confetti and glowing hearts.

- Show the message:



“YAYYYYY! HAPPY BIRTHDAY, MY HABIBI! 🎉💗”



“May every wish in your heart come true, Sukliiii! 🥹”



After a brief celebration, transition into the letter reveal.



---



🎉 7. Scene Six — Magical Birthday Celebration



Before showing the letter, play a short celebratory transition.



Fill the screen with:



- Pink confetti.

- Flying kisses.

- Glowing hearts.

- Sparkling stars.

- Soft bursts of pink light.



Display a short message:



“One last little surprise, just for you… 💌”



Then reveal a beautiful sealed love letter in the center of the screen.



The envelope should look elegant, with a black base, pink trim, a glowing heart seal, and a gentle floating animation.



Add this instruction:



“Tap the letter, Sukliiii… 💗”



The envelope must be genuinely interactive.



When clicked:



1. Animate the heart seal opening.

2. Make the envelope flap unfold.

3. Slide a letter upward from inside.

4. Zoom gently into the letter.

5. Reveal the message with a smooth typewriter effect or sequential fade-in animation.

6. Add a few small floating hearts around the letter without making the text difficult to read.



On mobile, make the letter large enough to read comfortably, with scrolling if necessary.



---



💌 8. Scene Seven — The Heartfelt Birthday Letter



Display a beautiful letter card with a soft pink paper texture, glowing edges, delicate hearts, and elegant handwritten typography.



Use this message EXACTLY, preserving the wording and emotional tone:



My dear habibi,



May Allah bless you this day and everyday with happiness... this is a small virtual gift from your lovely wife to make you feel happy... hope you feel happy seeing this...



I love u more than anything in this world alhamdulillah 😇... thanks for coming into my life...



Happy birthday my love 💕



Make the letter feel personal, warm, and sincere. Reveal the greeting first, then each paragraph one after another. Add tiny hearts floating around the edges and a subtle pink glow behind the letter.



At the end, show an animated signature:



Forever yours, your lovely wife 💋💗



Below the letter, include two options:



- READ MY LETTER AGAIN 💌

- GO TO OUR LITTLE DASHBOARD 💗



The first button replays the letter-opening and message-reveal animation.



The second button transitions to the final dashboard.



---



💖 9. Scene Eight — Our Little Love Dashboard



Create a beautiful final screen called:



“Our Little World, Sukliiii 💗”



Design a romantic dashboard rather than a corporate admin panel.



Use a black background, glowing pink hearts, a central anime couple illustration or two cute anime characters holding hands, and floating romantic particles.



Display:



“You are my favourite person, my safe place, and my sweetest blessing. 💕”



Add these interactive cards:



💌 Our Love Letter



- Opens the birthday letter again.



🎂 Birthday Surprise



- Replays the birthday cake countdown and candle-blowing interaction.



💋 Kiss Attack



- Triggers a screen full of flying kisses and hearts.



🏹 You Stole My Heart



- Replays the heart-and-arrow game.



🐱 Cute Cat Surprise



- Returns to the opening cat invitation.



Make every card functional and give each one a small hover or tap animation.



At the bottom, display:



“Made with endless love, just for you, Sukliiii 💗”



“Alhamdulillah for you, today and always. 😇💕”



Add a final animation in which a large glowing pink heart appears, beats three times, and fills the screen with tiny hearts.



---



✨ 10. Technical Requirements



Build the website as a complete working application, not merely a static mockup.



Preferred stack



- React with Vite.

- Tailwind CSS or clean custom CSS.

- Framer Motion for polished transitions, or CSS animations if simpler.

- Lucide icons only where useful.

- SVG/CSS artwork for lightweight anime-inspired decorative elements.

- JavaScript pointer events for the drag-and-release arrow game.



Functional requirements



1. Every YES and NO button must work exactly as described.

2. The YES button must progressively enlarge on the opening screen.

3. The NO button must shrink on the opening screen and relocate on the kiss-surprise screen.

4. The arrow game must support mouse and touch interactions.

5. The arrow must use genuine trajectory movement and heart collision detection.

6. Failed attempts must allow the player to retry.

7. The flying kisses must be animated and temporary, not static decorations.

8. The birthday countdown must run in the correct order.

9. Candle flames must visibly disappear after blowing or using the fallback button.

10. The letter must open through a click interaction.

11. The birthday message must be displayed exactly as provided.

12. The dashboard cards must work and allow replaying the respective scenes.

13. Transitions must preserve the current experience and avoid accidental page reloads.

14. Prevent duplicate timers, stale event handlers, and animations that continue indefinitely after a scene is closed.

15. Respect reduced-motion preferences and avoid excessive particle rendering on low-powered phones.

16. Ensure buttons have adequate tap targets and text remains legible on small screens.

17. Use a consistent design system across every scene.

18. Do not add unnecessary login, registration, payment, or database requirements.

19. The experience should work as a standalone frontend application without requiring a backend.

20. Make the website deployable to Vercel or Netlify and test every interaction before considering it complete.



Final Creative Direction



Make this feel like a handmade digital love story, not a generic birthday template. Prioritize emotion, adorable anime details, romantic black-and-pink visuals, surprising interactions, and smooth animations.



The overall journey should be:



Cute Cat Invitation → Sweetheart Message → Aim for My Heart → Heart Attack Message → Flying Kisses → Birthday Cake → Candle Blowing → Magical Celebration → Opening the Love Letter → Our Little Love Dashboard.



Every scene should make Sukliiii smile, laugh, and feel deeply loved. 💗💋🎂

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sukliii.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1386467d-5d41-42be-8b31-2c9707f79f14).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
