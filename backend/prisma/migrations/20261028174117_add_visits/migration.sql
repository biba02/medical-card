-- CreateTable
CREATE TABLE "visits" (
    "id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "visit_date" TIMESTAMP(3) NOT NULL,
    "doctor_name" VARCHAR(150) NOT NULL,
    "specialization" VARCHAR(100) NOT NULL,
    "diagnosis" TEXT,
    "recommendations" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
