import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import * as Sentry from '@sentry/nextjs'


const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_register",user.name);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <div className="flex items-center mb-4">
            <Image
              src="/AppointCare.png"
              height={100}
              width={100}
              alt="patient"
              className="w-50 rounded"
            />
            <div className="header ml-4 text-white text-3xl font-bold">AppointCare</div>
          </div>

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 AppointCare</p>
        </div>
      </section>

      <Image
        src="/regis.jpeg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;