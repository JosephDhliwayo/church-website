import { pgTable, text, numeric, timestamp, uuid } from "drizzle-orm/pg-core";

export const donations = pgTable("donations", {
  id: uuid("id").defaultRandom().primaryKey(),
  reference: text("reference").notNull().unique(),
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email").notNull(),
  donorPhone: text("donor_phone"),
  fund: text("fund").notNull(),
  note: text("note"),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  gateway: text("gateway").notNull(),
  method: text("method"),
  status: text("status").notNull().default("pending"),
  paynowReference: text("paynow_reference"),
  pesepayReference: text("pesepay_reference"),
  pollUrl: text("poll_url"),
  stripeSessionId: text("stripe_session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
