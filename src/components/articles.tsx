import ArticlesPage from "./articles-page";

const ArticleSection = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Interesting Articles
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover valuable mental health information and tips for living a
          healthier life.
        </p>
      </div>

      <div className="grid grid-cols-1  xl:grid-cols-3 xl:gap-12 lg:gap-6 gap-y-10 px-6 lg:px-4">
        <ArticlesPage />
      </div>
    </section>
  );
};

export default ArticleSection;
