import styles from "./DashboardPage.module.css";

import { useNavigationContext } from "../../context/Navigation.context";
import { Tabs } from "../../layout/SideBar/SideBar.definitions";
import { getDashboardData, getPassengers } from "../../api/queries";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useUserContext } from "../../context/User.context";
import type { PassengerData } from "../../interfaces/passenger.interface";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DashboardPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { currentUser } = useUserContext();

  // ping the getUserByID endpoint to get the user's data
  const { data: patientData, isLoading: patientLoading } =
    useQuery<PassengerData>({
      queryKey: ["passenger"],
      queryFn: async () =>
        getPassengers(
          currentUser?.["AirTable Record ID"] || "",
          await getToken(),
        ),
      enabled: true,
    });

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

  useEffect(() => {
    setCurrentTab(Tabs.HOME);
  }, []);

  if (patientLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardTitle}>
          Welcome back, {user?.firstName}!
        </div>
        <hr className={styles.subtitleDivider} />
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
                {patientData?.["# of Flight Legs"]}
              </div>
              <div className={styles.bottomText}># of Flight Legs</div>
            </div>
            <div className={styles.lowerCardContainer}>
              <div className={styles.numberText}>
                {patientData?.["# of Booked Flight Requests"]}
              </div>
              <div className={styles.bottomText}>
                # of Booked Flight Requests
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
