import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, CalendarPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormatDate from "./format-date";

const ArticleCard = ({datas}) => {
  return (
    <>{
    datas.map((e, i)=>(
    <Card key={i} className="overflow-hidden border-none rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={`/${e.thumbnail}`}
          alt={e.title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-0 pt-5">
        <p className="text-base text-gray-600 mt-2 flex items-center gap-2">
          <CalendarPlus className="w-4 h-4 inline" />
          <FormatDate dateString={e.createdAt}/>
        </p>
        <h3 className="font-bold text-lg leading-tight text-gray-900">
          {e.title}
        </h3>
      </CardHeader>
      <CardContent className="pt-2 pb-3">
        <div className="flex items-center text-gray-500 text-sm">
          <Image
            src={`/${e.user.image}`}
            alt={e.user.name}
            className="w-6 h-6 rounded-full mr-2 border border-gray-200"
            width={400}
            height={400}
          />
          <span className="font-medium">{e.user.name}</span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-2">
        <Link
          href={`/articles/${e.id}`}
          className="text-blue-600 text-sm font-semibold flex items-center group hover:text-blue-800 transition-colors"
        >
          Read
          <ArrowRight
            size={16}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </CardFooter>
    </Card>
    ))
  }</>
  );
};

export default ArticleCard;
