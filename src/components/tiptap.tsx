"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "text-xl [&_ul]:list-disc [&_ol]:list-decimal [&_ul>li]:ml-10 [&_ol>li]:ml-6",
      },
    },
    content: `<article>
        <p>Gangguan kecemasan adalah kondisi psikologis yang ditandai dengan perasaan cemas atau takut yang berlebihan dan terus-menerus. Kecemasan ini dapat mengganggu aktivitas sehari-hari dan menurunkan kualitas hidup seseorang. Meskipun semua orang pernah mengalami kecemasan dalam situasi tertentu, gangguan kecemasan terjadi ketika perasaan cemas menjadi berlebihan, sulit dikendalikan, dan berlangsung dalam jangka waktu yang lama.</p>
        
        <p>Gangguan kecemasan dapat memengaruhi siapa saja, baik anak-anak maupun orang dewasa. Kondisi ini dapat muncul dalam berbagai bentuk, seperti gangguan kecemasan umum (GAD), gangguan panik, fobia spesifik, gangguan obsesif-kompulsif (OCD), dan gangguan stres pascatrauma (PTSD). Untuk memahami lebih dalam tentang gangguan ini, mari kita bahas gejala, penyebab, serta cara mengatasinya.</p>
        
        <section>
            <h2>Gejala Gangguan Kecemasan</h2>
            <p>Gejala gangguan kecemasan dapat bervariasi tergantung pada jenisnya. Namun, beberapa gejala umum meliputi:</p>
            
            <h3>1. Gejala Fisik:</h3>
            <ul>
                <li>Detak jantung meningkat atau berdebar-debar (palpitasi)</li>
                <li>Sesak napas atau merasa tercekik</li>
                <li>Pusing, sakit kepala, atau mual</li>
                <li>Keringat berlebihan, baik di tangan, wajah, atau seluruh tubuh</li>
                <li>Otot tegang dan mudah lelah</li>
                <li>Gangguan pencernaan, seperti sakit perut atau diare</li>
            </ul>
            
            <h3>2. Gejala Emosional:</h3>
            <ul>
                <li>Ketakutan atau kekhawatiran yang berlebihan tanpa alasan jelas</li>
                <li>Kesulitan berkonsentrasi atau sering merasa pikiran kosong</li>
                <li>Perasaan gelisah atau mudah tersinggung</li>
                <li>Rasa takut yang tidak rasional terhadap sesuatu yang tidak membahayakan</li>
                <li>Perasaan panik yang tiba-tiba muncul dan sulit dikendalikan</li>
            </ul>
            
            <h3>3. Gejala Perilaku:</h3>
            <ul>
                <li>Menghindari situasi atau tempat tertentu karena takut cemas</li>
                <li>Kesulitan tidur atau insomnia akibat overthinking</li>
                <li>Menghindari interaksi sosial karena takut dinilai orang lain</li>
                <li>Memiliki kebiasaan tertentu yang dilakukan secara berulang untuk meredakan kecemasan (misalnya pada OCD)</li>
            </ul>
        </section>
        
        <section>
            <h2>Penyebab Gangguan Kecemasan</h2>
            <p>Gangguan kecemasan dapat disebabkan oleh berbagai faktor, baik yang bersifat biologis maupun lingkungan. Beberapa penyebab utama antara lain:</p>
            
            <ol>
                <li>Faktor Genetik: Jika seseorang memiliki anggota keluarga dengan riwayat gangguan kecemasan, maka risikonya untuk mengalami kondisi serupa lebih tinggi.</li>
                <li>Faktor Lingkungan: Stres berkepanjangan akibat pekerjaan, sekolah, atau masalah keluarga dapat menjadi pemicu gangguan kecemasan. Pengalaman traumatis seperti kehilangan orang terdekat, kecelakaan, atau kekerasan juga dapat meningkatkan risiko.</li>
                <li>Faktor Biologis: Ketidakseimbangan neurotransmitter di otak, seperti serotonin dan dopamin, dapat berkontribusi pada gangguan kecemasan. Hormon stres yang tinggi juga bisa memperparah kondisi ini.</li>
                <li>Gaya Hidup dan Kebiasaan: Konsumsi kafein berlebihan, kurang tidur, kurang olahraga, atau pola makan yang buruk dapat memperburuk kecemasan.</li>
                <li>Kepribadian dan Pola Pikir: Orang dengan sifat perfeksionis, pemalu, atau sering berpikir negatif lebih rentan mengalami gangguan kecemasan.</li>
            </ol>
        </section>
        
        <section>
            <h2>Cara Mengatasi Gangguan Kecemasan</h2>
            <p>Ada berbagai metode yang dapat membantu mengelola dan mengatasi gangguan kecemasan, di antaranya:</p>
            
            <h3>1. Teknik Relaksasi</h3>
            <ul>
                <li>Meditasi dan Mindfulness: Teknik ini membantu seseorang lebih fokus pada saat ini dan mengurangi pikiran negatif yang berlebihan.</li>
                <li>Teknik Pernapasan Dalam: Mengatur pernapasan dapat menenangkan sistem saraf dan mengurangi gejala fisik kecemasan.</li>
                <li>Yoga atau Olahraga Ringan: Aktivitas fisik dapat membantu melepaskan hormon endorfin yang meningkatkan suasana hati.</li>
            </ul>
            
            <h3>2. Perubahan Gaya Hidup</h3>
            <ul>
                <li>Mengurangi Konsumsi Kafein dan Alkohol: Zat ini dapat memicu atau memperburuk kecemasan.</li>
                <li>Menjaga Pola Tidur yang Baik: Tidur yang cukup dan berkualitas sangat penting untuk menjaga kesehatan mental.</li>
                <li>Makan Makanan Sehat: Konsumsi makanan bergizi, seperti buah, sayur, dan makanan kaya omega-3, dapat membantu menyeimbangkan suasana hati.</li>
                <li>Rutin Berolahraga: Aktivitas fisik dapat mengurangi stres dan meningkatkan rasa percaya diri.</li>
            </ul>
            
            <h3>3. Dukungan Sosial</h3>
            <ul>
                <li>Berbicara dengan Teman atau Keluarga: Berbagi cerita dan curhat dengan orang yang dipercaya dapat membantu mengurangi beban pikiran.</li>
                <li>Bergabung dengan Komunitas Dukungan: Bergabung dengan kelompok yang memiliki pengalaman serupa dapat memberikan rasa nyaman dan pemahaman.</li>
            </ul>
            
            <h3>4. Terapi Psikologis</h3>
            <ul>
                <li>Terapi Kognitif Perilaku (CBT): Terapi ini membantu mengubah pola pikir negatif yang menyebabkan kecemasan.</li>
                <li>Terapi Eksposur: Membantu menghadapi ketakutan secara bertahap agar seseorang dapat mengatasinya dengan lebih baik.</li>
            </ul>
            
            <h3>5. Pengobatan</h3>
            <p>Dalam beberapa kasus, dokter mungkin meresepkan obat anti-kecemasan atau antidepresan sesuai dengan kondisi pasien. Pengobatan ini harus dikonsumsi sesuai anjuran dokter dan tidak boleh dihentikan secara tiba-tiba.</p>
        </section>
    </article>`,
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
