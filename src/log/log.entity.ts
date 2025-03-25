import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';


@Entity()
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  methods: string;

  @Column()
  data: string;

  @Column()
  result: number;

  @ManyToOne(() => UserEntity, (user) => user.logs)
  @JoinColumn()
  user: UserEntity;
}