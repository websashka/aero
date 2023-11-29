import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "files" })
export class File {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: false })
  key: string;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
