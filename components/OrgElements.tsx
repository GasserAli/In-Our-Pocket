import { FaHandHoldingHeart } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { IoAnalyticsSharp } from "react-icons/io5";

const OrgElements = [
  {
    id: 1,
    title: "Donations",
    icon: <FaHandHoldingHeart />,
    link: "./viewDonationsOrganization",
  },

  {
    id: 2,
    title: "Analytics",
    icon: <IoAnalyticsSharp />,
    link: "./OrgLandingPage",
  },
];

export default OrgElements;
