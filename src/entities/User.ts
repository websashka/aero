import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { File } from "./File";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, name: "session_key" })
  sessionKey: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
