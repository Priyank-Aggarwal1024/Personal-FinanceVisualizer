"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "./Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { initialState, validateTransaction } from "@/utils/constants";
import TransactionForm from "./TransactionForm";
import CustomDialog from "./CustomDialog";
import { FaEdit } from "react-icons/fa";

function TransactionDetail() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(initialState);
  const [editTransactionMessage, setEditTransactionMessage] =
    useState(initialState);
  const [loading, setLoading] = useState(false);
  const fetchTransactionWithParams = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`/api/transactions`, {
        params: { page, pageSize },
      });

      if (status !== 200 || !data?.transactions) {
        throw new Error("Invalid response structure");
      }

      if (data.transactions && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      }
      setTotalTransaction(data.totalTransactions);
    } catch (error) {
      toast.error("Error fetching transactions");
      console.error("Error fetching transactions:", error);
    }
  }, [page, pageSize]);
  const [deleteId, setDeleteId] = useState("");
  const handleChange = (name, value) => {
    setEditTransaction((prev) => ({ ...prev, [name]: value }));
    setEditTransactionMessage((prev) => ({ ...prev, [name]: "" }));
  };
  const handleEditTransaction = async (transactionId) => {
    const { error, name, message } = validateTransaction(editTransaction);
    if (error) {
      return setFormMessage((prev) => ({ ...prev, [name]: message }));
    }
    if (!transactionId) {
      return alert("Select the transaction to edit");
    }
    setLoading(true);
    try {
      const updatedTransaction = await axios.put(
        `/api/transactions?transactionId=${transactionId}`,
        editTransaction
      );
      if (updatedTransaction.status === 200) {
        setEditTransaction(initialState);
        setEditTransactionMessage(initialState);
        await fetchTransactionWithParams();
        setIsDialogOpen(false);
        toast.success("Transaction updated successfully");
      }
    } catch (error) {
      toast.error("Error updating transaction: ", error.message);
      console.error("Error updating transaction:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTransaction = async (transactionId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/transactions?transactionId=${transactionId}`
      );
      if (response.status === 200) {
        await fetchTransactionWithParams();
        toast.success("Transaction deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting transaction");
      console.error("Error deleting transaction:", error.message);
    } finally {
      setLoading(false);
      setDeleteId("");
    }
  };
  useEffect(() => {
    fetchTransactionWithParams();
  }, [fetchTransactionWithParams]);
  return (
    <>
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditTransaction(initialState);
          setEditTransactionMessage(initialState);
        }}
      >
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
        <TransactionForm
          form={editTransaction}
          formMessage={editTransactionMessage}
          handleClick={() => handleEditTransaction(editTransaction._id)}
          handleChange={handleChange}
          loading={loading}
          textbutton="Edit"
          textloading="Updating..."
          icon={<FaEdit />}
        />
      </CustomDialog>
      <CustomDialog
        isOpen={deleteId != ""}
        onClose={() => {
          setDeleteId("");
        }}
      >
        <h2 className="text-xl font-bold mb-4">Delete Transaction</h2>
        <p className="opacity-75">Confirm DELETE transaction</p>
        <Button
          variant=""
          className="w-full mt-4"
          onClick={() => handleDeleteTransaction(deleteId)}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </CustomDialog>
      <Table className="overflow-hidden border relative mt-6 min-w-[800px]">
        <TableHeader>
          <TableRow className="w-full">
            <TableHead className="w-1/2">Description</TableHead>
            <TableHead className="w-1/6">Type</TableHead>
            <TableHead className="w-1/6">Category</TableHead>
            <TableHead className="w-1/6">Amount</TableHead>
            <TableHead className="text-center w-full">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, idx) => (
            <TableRow
              key={tx._id}
              className="hover:bg-gray-50 bg-gray-100 cursor-pointer"
            >
              <TableCell className="font-medium w-1/2">
                <span className="relative aspect-square min-w-8 p-1 mr-4 inline-flex rounded-full bg-black text-white justify-center items-center">
                  {(page - 1) * pageSize + idx + 1}
                </span>{" "}
                <span>{tx.description}</span>
              </TableCell>
              <TableCell className=" w-1/6">
                {String(tx.type).toLocaleUpperCase()}
              </TableCell>
              <TableCell className=" w-1/6">{tx.category}</TableCell>
              <TableCell className=" w-1fit">₹ {tx.amount}</TableCell>
              <TableCell className="text-right w-max gap-6 flex justify-between items-center">
                {new Date(tx.date).toISOString().split("T")[0]}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <BsThreeDots size={24} color="black" onClick={() => {}} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Transaction Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setIsDialogOpen(true);
                        setEditTransaction(tx);
                      }}
                    >
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setDeleteId(tx._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 lg:px-4 md:px-2 px-0 py-2">
        <div className="flex-1 flex justify-start">
          <Pagination
            pageSize={pageSize}
            totalTransaction={totalTransaction}
            onPageChange={setPage}
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page Size:
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => setPageSize(parseInt(value))}
          >
            <SelectTrigger
              className="w-24 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                                rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100"
            >
              <SelectValue placeholder="Set Page Size" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}

export default TransactionDetail;
