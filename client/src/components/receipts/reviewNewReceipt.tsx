import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { clearReceiptState } from "../../store/slices/receiptSlice";

interface ItemType {
  name: string;
  price: number;
  _id?: string;
}

interface ReceiptFormData {
  vendor: string;
  date: string;
  total: number;
  items: ItemType[];
}

const ReviewNewReceipt = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const { data, receiptId } = useSelector((state: RootState) => state.receipt);

  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  const normalizeDecimal = (val: { $numberDecimal: string } | number | undefined): number => {
    if (!val) return 0;
    if (typeof val === "object" && "$numberDecimal" in val) {
      return parseFloat(val.$numberDecimal);
    }
    return val as number;
  };

  const getDefaultValues = (): ReceiptFormData => {
    if (!data) return { vendor: "", date: "", total: 0, items: [] };

    return {
      vendor: data.vendor || "",
      date: formatDateForInput(data.date!) || "",
      total: normalizeDecimal(data.total),
      items: data.items.map(item => ({
        name: item.name,
        price: normalizeDecimal(item.price),
        _id: item._id
      })) || []
    };
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm<ReceiptFormData>({
    defaultValues: getDefaultValues()
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (formData: ReceiptFormData) => {
    console.log("Reviewed Data:", formData, "ReceiptId:", receiptId);
    dispatch(clearReceiptState())
    navigate("/");
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-bg">
        <p className="text-gray-400">No receipt data to review.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen w-screen flex bg-bg text-text"
    >
      {/* Left Sidebar */}
      <div className="w-1/3 max-w-md p-8 flex flex-col justify-between bg-bg border-r border-border">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text">🧾 Review Receipt</h2>

          {/* Vendor */}
          <div>
            <label className="block text-sm font-medium mb-1">Vendor</label>
            <input
              type="text"
              {...register("vendor", { required: "Vendor is required" })}
              className="w-full border border-border bg-card rounded-lg p-3 text-text focus:ring-2 focus:ring-primary-focus outline-none"
            />
            {errors.vendor && <p className="text-red-400 text-sm mt-1">{errors.vendor.message}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full border border-border bg-card rounded-lg p-3 text-text focus:ring-2 focus:ring-primary-focus outline-none"
            />
            {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
          </div>

          {/* Total */}
          <div>
            <label className="block text-sm font-medium mb-1">Total</label>
            <input
              type="number"
              step="0.01"
              {...register("total", { required: "Total is required", valueAsNumber: true })}
              className="w-full border border-border bg-card rounded-lg p-3 text-text focus:ring-2 focus:ring-primary-focus outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {errors.total && <p className="text-red-400 text-sm mt-1">{errors.total.message}</p>}
          </div>
        </div>

        {/* Confirm Button at bottom */}
        <button
          type="submit"
          className="w-full bg-primary text-text py-3 rounded-lg text-lg font-medium hover:bg-primary-hover cursor-pointer transition mt-8"
        >
          ✅ Confirm Receipt
        </button>
      </div>

      {/* Right Content (Items) */}
      <div className="flex-1 overflow-y-auto p-8">
        <h3 className="text-xl font-semibold mb-4">Items</h3>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-center bg-card rounded-lg p-3">
              <input
                type="text"
                placeholder="Item name"
                {...register(`items.${index}.name`, { required: "Item name is required" })}
                className="flex-1 border border-border bg-bg rounded-md p-2 text-text focus:ring-2 focus:ring-primary-focus outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                {...register(`items.${index}.price`, { required: "Price is required", valueAsNumber: true })}
                className="w-28 border border-border bg-bg rounded-md p-2 text-text focus:ring-2 focus:ring-primary-focus outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-error hover:text-error-hover text-sm font-medium"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ name: "", price: 0 })}
          className="mt-4 w-full border border-dashed border-border text-primary py-2 rounded-lg hover:bg-primary/50 transition cursor-pointer"
        >
          + Add Item
        </button>
      </div>
    </form>
  );
};

export default ReviewNewReceipt;
