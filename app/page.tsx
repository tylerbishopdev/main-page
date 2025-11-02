import HomePage from "@/components/home-page";
import Footer from "@/components/footer";

import MyWorks from "@/components/my-works";
import LayeredTextAdd from "@/components/ui/layered-text-add";

export default function Page() {
  return (
    <div>
      <HomePage />
      <LayeredTextAdd />

      <MyWorks />
      <Footer />

    </div>
  );
}