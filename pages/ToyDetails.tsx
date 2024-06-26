import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sideBar";
import { Button, Card, CardHeader, Divider, Input } from "@nextui-org/react";
import React from "react";
import FormView from "@/components/organizationPage";
import { item } from "@/components/ClothesDonationDetails";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import Image from "next/image";
import jeansImage from "@/components/images/jeans_image.jpg";
import Barbie from "@/components/images/barbie.jpg";

//import {columns} from '@/components/ClothesDonationDetails'

export default function ToyDetails() {
  const [quantity, setQuantity] = useState(1);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [selectedForm, setSelectedForm] = useState("");

  const [desc, setDesc] = useState("");

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    } else {
      alert("The maximum quantity you can donate for such item is 5.");
    }
  };
  function showAlert() {
    alert("Thank you for your contribution, your request has been submitted.");
  }
  return (
    <>
      <div>
        <Navbar />
        <Sidebar elements={DonorElements}></Sidebar>
      </div>
      {/* <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className="flex"> */}
      <div className="flex flex-col min-h-screen justify-center items-center gap-6 bg-gray-200">
        <Card
          className="flex flex-col justify-left items-left gap-4 p-6 bg-white rounded-lg shadow-md"
          style={{ width: "50%", minWidth: "400px" }}
        >
          <CardHeader className="flex justify-center items-left">
            <label className="text-4xl text-black font-bold">
              {" "}
              Category: Toy
            </label>
          </CardHeader>
          <Divider />
          <Card className="flex flex-row">
            <Card
              className="flex flex-col justify-left items-left gap-4 p-6 bg-cyan rounded-lg shadow-md"
              style={{ width: "30%", minWidth: "350px" }}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-2xl text-black font-bold mr-2 mt-2">
                    Type:{" "}
                  </p>
                  <p className="text-2xl text-black mt-2">Barbie Doll</p>
                </div>
                <div className="flex items-center">
                  <p className="text-2xl text-black font-bold mr-2 mt-3">
                    Gender:{" "}
                  </p>
                  <p className="text-2xl text-black mt-3"> Female</p>
                </div>
                <div className="flex items-center">
                  <p className="text-2xl text-black font-bold mr-2 mt-3">
                    Age:{" "}
                  </p>
                  <p className="text-2xl text-black mt-3"> 3+ years old </p>
                </div>
                {/* <div className="flex items-center">
                                    <p className="text-2xl text-black font-bold mr-2">Season:</p>
                                    <p className="text-2xl text-black"> All seasons</p>
                                </div> */}
                {/* <div className="flex items-center">
                                    <p className="text-2xl text-black font-bold mr-2">Material:</p>
                                    <p className="text-2xl text-black"> Denim</p>
                                </div> */}
                <div className="flex flex-row items-center">
                  <p className="text-2xl text-black font-bold mr-2 mt-3">
                    Quantity:{" "}
                  </p>
                  <Button
                    radius="full"
                    className="bg-black text-white text-1xl font-bold shadow-lg mr-4 mt-5"
                    onClick={decrementQuantity}
                    style={{ width: "10px", height: "30px" }}
                  >
                    -
                  </Button>
                  <span className="mr-4 mt-3">{quantity}</span>
                  <Button
                    radius="full"
                    className="bg-black text-white text-1xl font-bold shadow-lg mt-5"
                    onClick={incrementQuantity}
                    style={{ width: "10px", height: "30px" }}
                  >
                    +
                  </Button>
                </div>
                <div className=" text-black gap-10 text-2xl  mt-4 ">
                  <Input
                    value={desc}
                    type="text"
                    label="Description"
                    variant="bordered"
                    //color={"bg-black"}
                    onValueChange={setDesc}
                    className="max-w-xs text-black"
                    style={{ width: "300px" }}
                    placeholder="Enter specification for item (if needed)?"
                    //isRequired
                  />
                </div>
              </div>
            </Card>
            <Card className="flex flex-row bg-cyan rounded-lg shadow-md">
              <Image
                src={Barbie}
                alt="image of donated item: Doll"
                width={300}
                height={200}
              />
            </Card>
          </Card>

          <Divider />
          <div className="flex flex-row items-center  justify-center gap-10 ">
            <Link href="/schedAfterReq" className="text-black">
            <Button
              onClick={showAlert}
              type="submit"
              radius="full"
              className="bg-cyan text-black text-1xl font-bold shadow-lg"
              style={{ width: "300px" }}
            >
              Donate
            </Button>
            </Link>
            {/* <Button radius="full" className="bg-cyan text-black text-1xl font-bold shadow-lg"
                        > Go Back</Button> */}
          </div>
        </Card>

        {/* </div> */}
      </div>
    </>
  );
}
