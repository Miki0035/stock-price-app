"use client";
import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "./forms/InputField";
import SelectField from "./forms/SelectField";
import { ALERT_TYPE_OPTIONS, CONDITION_OPTIONS } from "@/lib/constants";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const AlertForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // 2️⃣ Ignore clicks inside select dropdown items (portals)
      if (target.closest('[data-slot="select-item"]')) return;

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        // Close the modal or perform any desired action
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, isOpen]);

  // react hook form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AlertFormData>({
    defaultValues: {
      alertName: "",
      symbol: "",
      alertType: "",
      condition: "",
      threshold: "",
      frequency: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<AlertFormData> = async (
    data: AlertFormData
  ) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="absolute top-0 left-0 w-full z-50 flex justify-center items-center h-screen">
      <div
        ref={modalRef}
        className={cn(
          "p-6 rounded-md bg-black/90 shadow-2xl shadow-black/50 w-full transition-all duration-800 rounded-md max-w-md bg-[#121214]",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <h1 className="text-2xl font-bold text-white mb-2">Price Alert</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-2 py-5">
          <InputField
            name="alertName"
            label="Alert Name"
            type="text"
            placeholder="Enter alert name"
            register={register}
            error={errors.alertName}
            validation={{ required: "Alert name is required" }}
          />
          <InputField
            name="symbol"
            label="Stock identifier"
            type="text"
            placeholder="Apple Inc. (AAPL)"
            register={register}
            error={errors.symbol}
            validation={{ required: "Stock identifier is required" }}
          />

          <SelectField
            name="alertType"
            label="Alert type"
            placeholder="Select alert type"
            control={control}
            options={ALERT_TYPE_OPTIONS}
          />

          <SelectField
            name="condition"
            label="Condition"
            placeholder=""
            control={control}
            options={CONDITION_OPTIONS}
          />
          <InputField
            name="threshold"
            label="Threshold value"
            type="number"
            placeholder="e.g: 140"
            register={register}
            error={errors.symbol}
            validation={{ required: "Threshold value is required" }}
          />

          <SelectField
            name="frequency"
            label="Frequency"
            placeholder=""
            control={control}
            options={CONDITION_OPTIONS}
          />

          <Button type="submit" className="yellow-btn w-full text-sm">
            Create Alert
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AlertForm;
