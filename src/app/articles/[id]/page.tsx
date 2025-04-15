import Image from "next/image";
import { Calendar, Eye, User } from "lucide-react";
import ArticleCard from "@/components/ui/article-card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import FormatDate from "@/components/ui/format-date";

async function getArticle(id) {
  const response = await fetch(`http://localhost:3000/api/articles/${id}`);

  return response.json();
}

async function getAllArticles() {
  const response = await fetch(`http://localhost:3000/api/articles`);

  return response.json();
}

export default async function Article({ params }) {
  const { id } = params;
  const articles = await getArticle(id);
  const articlesData = articles.data;

  const allArticles = await getAllArticles();

  return (
    <section className="container mx-auto">
      <article className="py-8 px-4 lg:px-24 xl:px-60">
        <p className="font-semibold text-primary">{articlesData.categories}</p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          {articlesData.title}
        </h1>

        <div className="flex items-center justify-between sm:justify-normal sm:gap-10 md:gap-20 mb-6">
          <div className="flex items-center gap-x-3">
            <Avatar className="h-14 w-14 border-2 rounded-full border-black flex items-center justify-center">
              <AvatarImage
                src={articlesData?.user.image || ""}
                alt={articlesData?.user.name || "User"}
              />
              <AvatarFallback className="text-black">
                <User />
              </AvatarFallback>
            </Avatar>
            <p className="sm:text-lg md:text-xl font-semibold">
              {articlesData.user.name}
            </p>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">
              <FormatDate dateString={articlesData.createdAt} />
            </p>
          </div>
          <div className="flex items-center">
            <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-lg md:text-xl font-semibold">
              {articlesData.view}
            </p>
          </div>
        </div>

        <Image
          src={`/${articlesData.thumbnail}`}
          width={1000}
          height={500}
          alt="Thumbnail"
          className="rounded-xl mx-auto mb-6"
        />

        <div
          dangerouslySetInnerHTML={{ __html: articlesData.content }}
          className="text-base text-justify [&_ul]:list-disc [&_ol]:list-decimal [&_ul>li]:ml-10 [&_ol>li]:ml-6 md:text-lg xl:text-xl"
        />
      </article>

      <div className="w-full">
        <div className="mb-12 text-center mt-14 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 max-w-lg">
            Want to Keep Reading? Check Out This Article!
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover valuable mental health information and tips for living a
            healthier life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-28">
          <ArticleCard datas={allArticles.data} />
        </div>
      </div>
    </section>
  );
}
