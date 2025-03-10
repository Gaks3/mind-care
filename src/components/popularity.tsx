import React from "react";

const datas = [{data: '30.899.123+ Pengguna', proof: 'Chat, pesan, sesi audio, dan video.'}, {data: '20.438+', proof: 'Terapis profesional siap mendukung Anda.'},{data: '1.446.331+', proof: 'Orang berhasil dibantu'}]

const Popularity = () => {
  return (
    <section className="w-full flex px-12 justify-center pb-20 gap-24">
      <div className="text-5xl w-[31%] flex items-center leading-[60px]">Layanan kesehatan mental terbesar di dunia. 100% honline.</div>
      <div className="flex gap-4 flex-col w-[40%] justify-center">
        {datas.map(({data, proof},i)=>(
            <div key={i} className="text-2xl border-b-[6px] border-[#00A2FF] pb-2">
                <h2>{data}</h2>
                <p>{proof}</p>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Popularity;
