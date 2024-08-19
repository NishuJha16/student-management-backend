import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('Student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  student_id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  mobile_number: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  class: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  roll_number: string;

  @ManyToOne(() => User, (user) => user.students)
  user: User;
}
