import React, { Key, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  Button,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { DeleteIcon } from "./deleteIcon";
import { EyeIcon } from "./eyeIcon";
import DeleteDialog from "./deleteDialog";
import { BiSolidDonateBlood } from "react-icons/bi";
import { TbHorseToy } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { FaDrumstickBite,FaBriefcaseMedical,FaPencilRuler  } from "react-icons/fa";
import { useRouter } from "next/router";
// import { ViewRequestDetails } from "../pages/viewRequestDetails";

export default function DonationTable({donations, columns,deleteFunction}: {donations: any[], columns: any[],deleteFunction: any  }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [donationId, setDonationId] = useState(0);
  const [variant, setVariant] = useState("");
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);

  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  function handleDelete  (id:number)  {
    openDeleteDialog();
    setDonationId(id); 
  };
  function deleteEntry(){
    deleteFunction(donationId);
    closeDeleteDialog();
  }
  
  const handleViewClick = ( request: any) => {
    sessionStorage.setItem('selectedReqID', request.id.toString());
    // onOpen();
    router.push(`/viewRequestDetails?query=${getActionString(request)}`)
    console.log("Org ID:", request.id);
    console.log("Category:", request.Category);
    console.log("Status:", request.status);
  };

  const statusColorMap = {
    Fulfilled: "success",
    Pending: "default",
  };

  // Function to determine action string based on category and status
  const getActionString = (donation: any): string => {
    if (donation.Category === "Volunteering" && donation.status === "Fulfilled") {
      return "fulfilledNormalRequest";
    } else {
      return "unfulfilled";
    }
  };

  const renderCell = React.useCallback(
    (donation: any, columnKey: string, key: string, value: string) => {
      const cellValue = donation[columnKey];
  
      switch (columnKey) {
        case "donation":
          let avatarIcon;
          switch (donation.Category) {
            case "Clothes":
              avatarIcon = <GiClothes />;
              break;
            case "Toys":
              avatarIcon = <TbHorseToy />;
              break;
            case "Food":
              avatarIcon = <FaDrumstickBite />;
              break;
            case "Medical Supplies":
              
              avatarIcon = <FaBriefcaseMedical />;
              break;
            case "School Supplies":
              avatarIcon = <FaPencilRuler />;
              ;
              break;
            case "Blood Donation":
            default:
              avatarIcon = <BiSolidDonateBlood />;
              break;
          }
          return (

            <div className="flex items-center">
              {avatarIcon && <span className="mr-2">{avatarIcon}</span>}
              <span className="font-semibold">{donation.donation}</span>
            </div>
          );
        case "status":
          // Here you can apply your filtering logic based on key and value
            return (
              <Chip
                className="capitalize"
                color={
                  statusColorMap[
                    donation.status as keyof typeof statusColorMap
                  ] as "success" | "warning" | undefined
                }
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            );
          
        case "actions":
          return (
            <div className="relative flex items-center gap-2 mt-1">
              <Tooltip content="View Donation">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleViewClick(donation)}>
                  <EyeIcon />
                  {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                      {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Request Details</ModalHeader>
                        <ModalBody>
                          <ViewRequestDetails variant={"unfulfilled"} />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="light" onPress={onClose}>
                            Close
                          </Button>
                          <Button color="primary" onPress={onClose}>
                            Action
                          </Button>
                      </ModalFooter>
                      </>
                    )}
                    </ModalContent>
                    </Modal> */}
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete donation">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDelete(donation.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
              {/* <span>{getActionString(donation)}</span> */}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const paginatedDonations = donations.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  


  return (
    <div className="flex-1 flex flex-col">
      <Table aria-label="Donations table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedDonations}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey: Key) => (
                <TableCell>
                  {renderCell(item, columnKey.toString(), "status", "pending")}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        className="mt-2"
        initialPage={currentPage}
        total={Math.ceil(donations.length / 5)}
        color="primary"
        onChange={(page) => handlePageChange(page)}
      ></Pagination>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={deleteEntry}
        messageHeader="Delete Donation"
        message="Are you sure you want to delete this donation request? Donation will be permanently
        removed. This action cannot be undone."
      />
    </div>
  );
}


