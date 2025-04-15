import Image from "next/image";
import { Calendar, Eye, User } from "lucide-react";
import ArticlesPage from "@/components/articles-page";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import FormatDate from "@/components/ui/format-date";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getArticle(id) {
  const response = await fetch(`http://localhost:3000/api/articles/${id}`);

  return response.json();
}

export default async function Article({ params }) {
  const { id } = params;
  const articles = await getArticle(id);
  const articlesData = articles.data;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    const user = session?.user;


  return (
    <section className="container mx-auto">
      <article className="py-8 px-4 lg:px-24 xl:px-60">
        <p className="font-semibold text-primary">{articlesData.categories}</p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          {articlesData.title}
        </h1>

        <div className="flex items-center justify-between sm:justify-normal sm:gap-10 md:gap-20 mb-6">
          <div className="flex items-center">
            <Avatar className="h-14 w-14 flex items-center justify-center">
              <AvatarImage
                src={articlesData?.user.image || ""}
                alt={articlesData?.user.name || "User"}
              />
              <AvatarFallback className="text-black">
                <User />
              </AvatarFallback>
            </Avatar>
            <p className="sm:text-sm md:text-lg font-semibold">
              {articlesData.user.name}
            </p>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="sm:text-sm md:text-lg font-semibold">
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

        {articlesData.user.id === user?.id && (
        <div className="flex justify-end mt-10">
          <Link
            href={`/articles/${id}/edit`}
            className="w-fit bg-primary text-white rounded-md py-2 px-6 text-lg font-semibold cursor-pointer"
          >
            Edit Article
          </Link>
        </div>
        )}

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

        <div className="grid grid-cols-1  xl:grid-cols-3 xl:gap-12 lg:gap-6 gap-y-10 px-6 md:px-10 lg:px-0">
          <ArticlesPage />
        </div>
      </div>
    </section>
  );
}
