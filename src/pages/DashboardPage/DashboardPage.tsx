import styles from "./DashboardPage.module.css";
import Rotunda from "./components/Rotunda/Rotunda";
import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { getDashboardData } from "../../api/queries";
import Divider from "../../components/Divider/Divider";
import { DividerSpacing } from "../../components/Divider/Divider.definitions";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { DashboardData } from "./DashboardPage.definitions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const DashboardPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const { getToken } = useAuth();
  const { user } = useUser();

  const images = [
    "src/pages/DashboardPage/components/MF_5.jpeg",
    "src/pages/DashboardPage/components/MF_2.jpeg",
    "src/pages/DashboardPage/components/MF_3.jpeg",
    "src/pages/DashboardPage/components/MF_4.jpeg",
    "src/pages/DashboardPage/components/MF_1.jpeg",
    "src/pages/DashboardPage/components/MF_7.png",
    "src/pages/DashboardPage/components/MF_8.webp",
  ];

  const PrevArrow = (props: any) => (
    <button onClick={props.onClick} className={styles.prevArrow}>
      ◀
    </button>
  );

  const NextArrow = (props: any) => (
    <button onClick={props.onClick} className={styles.nextArrow}>
      ▶
    </button>
  );

  const { data: dashboardData, isLoading: dashboardLoading } =
    useQuery<DashboardData>({
      queryKey: ["dashboard"],
      queryFn: async () => getDashboardData(await getToken()),
      enabled: true,
    });

  console.log("dashboardData:", dashboardData);

  useEffect(() => {
    setCurrentTab(Tabs.HOME);
  }, []);

  if (dashboardLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardTitle}>
          Welcome back, {user?.firstName}!
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={true}
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
            >
              {images.map((src, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className={styles.image}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.upperCardContainer}>
              <div className={styles.numberText}>
                {dashboardData?.["All Total Flights"]}
              </div>
              <div className={styles.bottomText}>Total Flights</div>
            </div>
            <div className={styles.lowerCardContainer}>
              <div className={styles.numberText}>
                {dashboardData?.["Flights This Week"]}
              </div>
              <div className={styles.bottomText}>Flights This Week</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
