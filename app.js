const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll('.main__container, .services__container > div');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
            }
        });
    });

    containers.forEach(container => {
        observer.observe(container);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const animatedTexts = document.querySelectorAll('.animated-text');

    animatedTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('visible'); // Tambahkan kelas visible dengan delay
        }, index * 300); 
    });

    const animatedElements = document.querySelectorAll('.animated-image, .animated-video');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // kelas visible untuk gambar dan video
            } else {
                entry.target.classList.remove('visible'); // Hapus kelas visible jika elemen keluar dari viewport
            }
        });
    });

    animatedElements.forEach(element => {
        observer.observe(element); // Mulai mengamati setiap elemen
    });
});

document.getElementById('start-btn').addEventListener('click', function () {
    document.getElementById('start-btn').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    showQuestion(1);
});

let currentQuestion = 1;
let score = 0;
const correctAnswers = {
    q1: "A",
    q2: "C",
    q3: "A"
};

function showQuestion(questionNumber) {
    // Sembunyikan semua pertanyaan
    const allQuestions = document.querySelectorAll('.quiz-question');
    allQuestions.forEach((q) => q.classList.add('hidden'));

    // Tampilkan pertanyaan saat ini
    const current = document.getElementById(`question${questionNumber}`);
    current.classList.remove('hidden');
}

function nextQuestion(questionNumber) {
    // Cek jawaban yang dipilih
    const selectedAnswer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === correctAnswers[`q${questionNumber}`]) {
            score += 1;
        }
        currentQuestion++;
        if (currentQuestion <= 3) {
            showQuestion(currentQuestion);
        }
    } else {
        alert("Pilih jawaban sebelum lanjut.");
    }
}

function submitQuiz() {
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedAnswer) {
        if (selectedAnswer.value === correctAnswers[`q${currentQuestion}`]) {
            score += 1;
        }
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('quiz-result').classList.remove('hidden');
        document.getElementById('score').textContent = `Skor Anda: ${score}/3`;
    } else {
        alert("Pilih jawaban sebelum lanjut.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const showSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight / 1.3;  // Trigger when 70% of the section is visible

            if (sectionTop < triggerPoint) {
                section.classList.add('show');
            }
        });
    };
    showSection();
    
    window.addEventListener('scroll', showSection);
});

