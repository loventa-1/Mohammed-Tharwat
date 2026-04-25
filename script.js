// ==========================================
// 🎯 جميع المتغيرات القابلة للتعديل - عدل هنا فقط
// ==========================================
const CONFIG = {
  // 📅 معلومات الزفاف
  wedding: {
    groomName: "محمد ثروت",
    brideName: "عروسته",
    date: "الاثنين الموافق 27 / 4 / 2026",
    lunchTime: "1 ظهرًا",
    hennaTime: "6 مساءً",
  },

  // 📍 معلومات الموقع
  location: {
    address: "سللنت – أمام مركز شباب سللنت",
    directions: "أول طريق طناح – المنصوره",
    hallName: "قاعة سللنت",
    // ⚠️ رابط خرائط Google - استبدله بالرابط الصحيح
    googleMapsUrl:
      "https://maps.apple.com/place?map=explore&place-id=IC518CC8CEF7AE2F8&address=Sellnet%2C+Al+Mansurah%2C+Dakahlia%2C+Egypt&coordinate=31.020573%2C31.417247&name=%D9%85%D8%B1%D9%83%D8%B2+%D8%B4%D8%A8%D8%A7%D8%A8+%D8%B3%D9%84%D9%84%D9%86%D8%AA&_provider=9902",
  },

  // 🎵 إعدادات الصوت
  audio: {
    // ⚠️ رابط ملف الصوت - استبدله برابطك
    src: "assets/music/song.mp3",
    volume: 0.4,
    loop: true,
  },

  // 🖼️ إعدادات الصورة
  image: {
    // ⚠️ رابط الصورة - استبدله برابط صورتك
    src: "assets/images/couple.webp", // اتركه فارغ لو عاوز تستخدم placeholder
    alt: "أحمد وعروسته",
  },

  // ✨ النصوص
  text: {
    invitationTitle:
      "تتشرف عائلة الحاج ثروت\nبدعوة حضراتكم لحضور\nوليمة زفاف الاستاذ احمد ثروت",
    quranVerse:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا",
    endingMessage: "✨ يسعدنا ويشرفنا حضوركم ✨",
  },
};

// ==========================================
// 🚀 الكود التنفيذي - ما تغيرش حاجة تحت هنا
// ==========================================

(function () {
  "use strict";

  // Elements
  const hookScreen = document.getElementById("hookScreen");
  const mainCard = document.getElementById("mainCard");
  const openBtn = document.getElementById("openInvitationBtn");
  const locationBtn = document.getElementById("locationButton");
  const musicControl = document.getElementById("musicControl");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  const coupleImage = document.getElementById("coupleImage");

  // Audio state
  let audio = null;
  let isPlaying = false;

  // ========== تهيئة الصورة ==========
  function initImage() {
    if (CONFIG.image.src && coupleImage) {
      coupleImage.innerHTML = `
        <img src="${CONFIG.image.src}" 
             alt="${CONFIG.image.alt}" 
             style="width: 100%; height: 100%; object-fit: cover; border-radius: 28px;">
      `;
      coupleImage.style.padding = "0";
      coupleImage.style.background = "transparent";
    }
  }

  // ========== إنشاء عنصر الصوت ==========
  function createAudio() {
    if (audio) return audio;
    audio = new Audio(CONFIG.audio.src);
    audio.loop = CONFIG.audio.loop;
    audio.volume = CONFIG.audio.volume;
    audio.preload = "auto";
    return audio;
  }

  // ========== تشغيل الصوت ==========
  function playAudio() {
    if (!audio) audio = createAudio();

    audio
      .play()
      .then(() => {
        isPlaying = true;
        updateMusicButton();
      })
      .catch((err) => {
        console.log("Audio play prevented:", err);
        isPlaying = false;
        updateMusicButton();
      });
  }

  // ========== إيقاف الصوت ==========
  function pauseAudio() {
    if (audio) {
      audio.pause();
      isPlaying = false;
      updateMusicButton();
    }
  }

  // ========== تبديل الصوت ==========
  function toggleMusic() {
    if (!audio) audio = createAudio();

    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  // ========== تحديث زر الموسيقى ==========
  function updateMusicButton() {
    if (isPlaying) {
      musicIcon.className = "fas fa-volume-up";
      musicText.textContent = "إيقاف الموسيقى";
    } else {
      musicIcon.className = "fas fa-volume-mute";
      musicText.textContent = "تشغيل الموسيقى";
    }
  }

  // ========== فتح الدعوة ==========
  function revealInvitation() {
    hookScreen.classList.add("hidden");

    setTimeout(() => {
      mainCard.classList.add("visible");
    }, 100);

    createAudio();
    playAudio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ========== فتح الموقع في خرائط Google ==========
  function openLocation() {
    window.open(CONFIG.location.googleMapsUrl, "_blank");
  }

  // ========== تهيئة النصوص ==========
  function initTexts() {
    // ممكن تضيف تحديث النصوص من CONFIG لو عاوز
    // حالياً النصوص مكتوبة في HTML
  }

  // ========== Event Listeners ==========
  function initEvents() {
    // زر فتح الدعوة
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      revealInvitation();
    });

    // الضغط على شاشة البداية
    hookScreen.addEventListener("click", (e) => {
      if (e.target === hookScreen || e.target.closest(".hook-content")) {
        revealInvitation();
      }
    });

    // زر الموقع
    locationBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openLocation();
    });

    // زر الموسيقى
    musicControl.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMusic();
    });

    // ESC للفتح
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !hookScreen.classList.contains("hidden")) {
        revealInvitation();
      }
    });

    // إيقاف الصوت عند تبديل التبويب
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && audio && isPlaying) {
        audio.pause();
      } else if (!document.hidden && audio && isPlaying) {
        audio.play().catch(() => {});
      }
    });
  }

  // ========== بدء التشغيل ==========
  function init() {
    initImage();
    initTexts();
    initEvents();
    createAudio(); // تجهيز الصوت بدون تشغيل
  }

  init();
})();
