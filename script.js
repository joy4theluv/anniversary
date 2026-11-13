/* PASSWORD SETTING */
        const SECRET_PASSWORD = "1096";

        /* Floating Pink Star & Heart Background Animation */
        const canvas = document.getElementById('heart-canvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class FloatingParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 20;
                this.size = Math.random() * 10 + 4;
                this.speedY = Math.random() * 1.2 + 0.4;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.swing = Math.random() * 0.02;
                this.swingAngle = Math.random() * Math.PI * 2;
            }

            update() {
                this.y -= this.speedY;
                this.swingAngle += this.swing;
                this.x += Math.sin(this.swingAngle) * 0.5;

                if (this.y < -20) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#f472b6';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const particles = Array.from({ length: 30 }, () => new FloatingParticle());

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();

        /* Interactive Click Particles */
        window.addEventListener('click', (e) => {
            createClickHeart(e.clientX, e.clientY);
        });

        function createClickHeart(x, y) {
            const heart = document.createElement('div');
            heart.className = 'click-heart text-2xl';
            const icons = ['✨', '⭐', '💗', '🌸', '💖'];
            heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 1200);
        }

        /* Heart Emoji Pattern Matrix & Sequential Reveal Animation */
        const heartPattern = [
            "  ###   ###  ",
            " ##### ##### ",
            "#############",
            "#############",
            "#############",
            " ########### ",
            "  #########  ",
            "   #######   ",
            "    #####    ",
            "     ###     ",
            "      #      "
        ];

        let heartTimeouts = [];

        function renderHeartGrid() {
            const gridContainer = document.getElementById('heart-grid');
            if(!gridContainer) return;

            gridContainer.innerHTML = '';
            const rows = heartPattern.length;
            const cols = heartPattern[0].length;
            gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

            const emojiElements = [];

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const char = heartPattern[r][c];
                    const span = document.createElement('span');
                    span.className = 'heart-emoji';
                    if (char === '#') {
                        span.innerText = '❤️';
                        emojiElements.push(span);
                    } else {
                        span.innerText = ' ';
                        span.style.visibility = 'hidden';
                    }
                    gridContainer.appendChild(span);
                }
            }

            // Clear previous timeouts
            heartTimeouts.forEach(t => clearTimeout(t));
            heartTimeouts = [];

            // Sequentially make heart emojis visible one by one
            emojiElements.forEach((el, index) => {
                const timeout = setTimeout(() => {
                    el.classList.add('visible');
                }, index * 35); // 35ms delay per emoji
                heartTimeouts.push(timeout);
            });
        }

        function replayHeartAnimation() {
            renderHeartGrid();
        }

        /* Gift Reveal Logic */
        function openGift() {
            const giftBox = document.getElementById('gift-box');
            const passwordForm = document.getElementById('password-form');
            
            giftBox.style.display = 'none';
            passwordForm.classList.remove('hidden');
        }

        /* Password Verification Logic */
        function checkPassword() {
            const userInput = document.getElementById('pass-input').value.trim();
            const errorMsg = document.getElementById('error-msg');
            const passwordForm = document.getElementById('password-form');
            const revealedMsg = document.getElementById('gift-revealed-msg');
            const mainContent = document.getElementById('main-content');

            if (userInput === SECRET_PASSWORD) {
                passwordForm.classList.add('hidden');
                revealedMsg.classList.remove('hidden');
                mainContent.classList.remove('hidden');
                // Trigger Heart Matrix Animation
                renderHeartGrid();
            } else {
                errorMsg.classList.remove('hidden');
            }
        }

        document.getElementById('pass-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });

        /* Music Player Controls */
        const audio = document.getElementById('audio-player');
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const progressBar = document.getElementById('progress-bar');
        const currentTimeEl = document.getElementById('current-time');
        const totalDurationEl = document.getElementById('total-duration');
        const volumeIcon = document.getElementById('volume-icon');

        const playlist = [
            {
                title: "အမှတ်တမဲ့",
                artist: "D-Vision , Lu Hpring",
                art: "https://c-cf.cdn.smule.com/smule-gg-uw1-s-5/arr/12/70/56592ffd-d06f-49c6-93ae-72aa3e3ee990.jpg",
                src: "https://www.image2url.com/r2/default/files/1794406243416-c6a43656-9677-4e6d-aa91-a7ac3a0ce61f.m4a"
            },
            {
                title: "အလွမ်းပြေအနမ်း",
                artist: "Bunny Phyoe",
                art: "https://i.ytimg.com/vi/cF_CdT1vrRU/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLCzfDGdMGePdoI-v8nP__pRgQwNGg",
                src: "https://www.image2url.com/r2/default/files/1794406704108-a765cfe9-b862-4776-9e2b-b59f3f13716a.m4a"
            },
            {
                title: "အပြာရောင်ည",
                artist: "Myo Gyi",
                art: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fviberate-upload.ams3.cdn.digitaloceanspaces.com%2Fprod%2Fentity%2Fartist%2Fmyo-gyi.jpg&f=1&nofb=1&ipt=4c1437c73010dfc9a7759f0ba5673d532e82142d9a62de4c944a8fbcba006ac9&ipo=images",
                src: "https://www.image2url.com/r2/default/files/1794407553582-6b7d91cd-6226-4749-a019-e4829fed71f9.mp3"
            }

        ];

        let currentTrackIndex = 0;

        function togglePlayPause() {
            if (audio.paused) {
                audio.play();
                updatePlayState(true);
            } else {
                audio.pause();
                updatePlayState(false);
            }
        }

        function updatePlayState(isPlaying) {
            if (isPlaying) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        }

        function loadTrack(index) {
            const track = playlist[index];
            document.getElementById('track-title').innerText = track.title;
            document.getElementById('track-artist').innerText = track.artist;
            document.getElementById('track-art').src = track.art;
            audio.src = track.src;
            audio.load();
        }

        function prevTrack() {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrackIndex);
            audio.play();
            updatePlayState(true);
        }

        function nextTrack() {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(currentTrackIndex);
            audio.play();
            updatePlayState(true);
        }

        audio.addEventListener('ended', () => {
            nextTrack();
        });

        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.value = progressPercent;
                currentTimeEl.innerText = formatTime(audio.currentTime);
                totalDurationEl.innerText = formatTime(audio.duration);
            }
        });

        progressBar.addEventListener('input', () => {
            if (audio.duration) {
                const seekTime = (progressBar.value / 100) * audio.duration;
                audio.currentTime = seekTime;
            }
        });

        function formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec < 10 ? '0' : ''}${sec}`;
        }

        function toggleMute() {
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeIcon.classList.remove('fa-volume-high');
                volumeIcon.classList.add('fa-volume-xmark');
            } else {
                volumeIcon.classList.remove('fa-volume-xmark');
                volumeIcon.classList.add('fa-volume-high');
            }
        }

        /* Lightbox Modal Logic */
        function openLightbox(element) {
            const img = element.querySelector('img');
            const caption = element.getAttribute('data-caption');
            const modal = document.getElementById('lightbox-modal');
            
            document.getElementById('lightbox-img').src = img.src;
            document.getElementById('lightbox-caption').innerText = caption || 'Sweet Memory';
            modal.classList.remove('hidden');
        }

        function closeLightbox() {
            document.getElementById('lightbox-modal').classList.add('hidden');
        }

        /* Falling GIF & Letter Trigger Logic */
        function triggerFallingGif() {
            const container = document.getElementById('falling-gif-container');
            const gifElement = document.getElementById('falling-gif-element');
            
            container.classList.remove('hidden');
            gifElement.classList.remove('falling-gif-anim');
            void gifElement.offsetWidth;
            gifElement.classList.add('falling-gif-anim');
        }

        function openLetterFromGif() {
            document.getElementById('falling-gif-container').classList.add('hidden');
            openLetterModal();
        }

        /* TYPING EFFECT FOR HEART LETTER */
        const letterParagraphs = [
            "Happy 3rd Anniversary လေးပါ Babe လေးရေ။ အခုချိန်ထိ ကိုကိုအမှား​တွေလုပ်ခဲ့မိတဲ့အချိန်​တွေအားလုံးကို နားလည်​ပေးပြီး အများကြီးချစ်​ပေး​နေတာကို ကိုကို ​အရမ်း​ပျော်တယ်။",
            "ကိုကိုလည်း အရင်ကထက် Babe ရဲ့ စိတ်ခံစားချက်​တွေကို ပိုနားလည်​ပေးချင်တယ်၊ စိတ်ညစ်​အောင် မလုပ်မိဖို ကြိုးစားမယ်။ ဝမ်းနည်း​စေမယ့်အစားဘယ်လိုမျိုးလုပ်ရင် စိတ်​လေးကြည်သွား​အောင် ထားချင်တယ်။ Babe ​​ပေးထားခဲ့တဲ့ အချစ်သဝဏ်လွှာထဲက စာ​​ကြောင်းလေးအတိုင်း အခက်အခဲ​တွေရှိတိုင်း လက်တွဲမဖြုတ်ဘဲ အတူတူဖြတ်​ကျော်/ရှိ​​နေကြမယ်​နော်။ ကိုကိုလည်း အများကြီးပိုချစ်မယ်၊ တန်ဖိုးထားပြီး ဂရုစိုက်​ပေးချင်တယ် ​နောင်နှစ်​တွေအများကြီးဆီ....",
            "ဆိုးသင့်တဲ့​နေရာ​လေး​တွေဘဲ ဆိုးပြီး အခုလို​လေးဘဲ ကိုကိုအနားမှာ ကျန်းကျန်းမာမာ​လေးရှိ​နေ​ပေးပါ​နော်။ ကိုကိုရဲ့ ချစ်​​မေတ္တာလက်​ဆောင်​လေး​တွေက မကြာခင်​ရောက်လာ​တော့မှာမို ဒီသဝဏ်လွှာ​လေးနဲ့ ​အရင်ချော့လိုက်ရပါတယ် ခင်ဗျ 😛။"
        ];
        const letterClosing = "Your are a limited edition to me that nothing can replace";

        let currentTypingTimeout = null;

        function startTypingEffect() {
            const p1 = document.getElementById('typed-p1');
            const p2 = document.getElementById('typed-p2');
            const p3 = document.getElementById('typed-p3');
            const closing = document.getElementById('typed-closing');

            p1.innerText = '';
            p2.innerText = '';
            p3.innerText = '';
            closing.innerText = '';

            p1.className = 'typing-cursor';
            p2.className = '';
            p3.className = '';
            closing.className = 'font-handwriting text-2xl text-pink-600 font-semibold h-8';

            typeSentence(letterParagraphs[0], p1, () => {
                p1.className = '';
                p2.className = 'typing-cursor';
                typeSentence(letterParagraphs[1], p2, () => {
                    p2.className = '';
                    p3.className = 'typing-cursor';
                    typeSentence(letterParagraphs[2], p3, () => {
                        p3.className = '';
                        closing.className = 'font-handwriting text-2xl text-pink-600 font-semibold h-8 typing-cursor';
                        typeSentence(letterClosing, closing, () => {
                            closing.className = 'font-handwriting text-2xl text-pink-600 font-semibold h-8';
                        }, 40);
                    }, 25);
                }, 25);
            }, 25);
        }

        function typeSentence(text, element, callback, speed = 30) {
            let index = 0;
            function typeChar() {
                if (index < text.length) {
                    element.innerText += text.charAt(index);
                    index++;
                    currentTypingTimeout = setTimeout(typeChar, speed);
                } else if (callback) {
                    callback();
                }
            }
            typeChar();
        }

        function stopTypingEffect() {
            if (currentTypingTimeout) {
                clearTimeout(currentTypingTimeout);
            }
        }

        /* Letter Modal Logic */
        function openLetterModal() {
            document.getElementById('letter-modal').classList.remove('hidden');
            startTypingEffect();
        }

        function closeLetterModal() {
            stopTypingEffect();
            document.getElementById('letter-modal').classList.add('hidden');
        }