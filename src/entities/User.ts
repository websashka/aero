import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { File } from "./File";

@Unique("unique_login)constraint", ["login"])
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, name: "session_key" })
  sessionKey: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
