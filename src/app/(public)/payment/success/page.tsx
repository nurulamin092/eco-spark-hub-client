// ============ src/app/(public)/payment/success/page.tsx ============
import { Suspense } from "react";
import { PaymentSuccessContent } from "./PaymentSuccessContent";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    </div>
  );
}
