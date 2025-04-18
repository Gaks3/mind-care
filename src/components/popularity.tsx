import { Users, MessageSquare, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    data: "27.500+ Users",
    proof: "Chat, messages, audio sessions, and video.",
    icon: <Users className="h-8 w-8" />,
  },
  {
    data: "315+",
    proof: "Profesional therapists ready to support you.",
    icon: <MessageSquare className="h-8 w-8" />,
  },
  {
    data: "36.800+",
    proof: "Clients helped",
    icon: <Award className="h-8 w-8" />,
  },
];

const Popularity = () => {
  return (
    <section className="w-full py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="lg:w-[45%]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-primary">
              One of the best online counseling services in Indonesia. 100%
              online.
            </h2>
          </div>

          <div className="lg:w-[55%]">
            {stats.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-6 p-6 mb-6 rounded-lg transition-all",
                  "hover:bg-primary/10 group border-b-[3px] border-primary",
                )}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-1">
                    {item.data}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.proof}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popularity;
