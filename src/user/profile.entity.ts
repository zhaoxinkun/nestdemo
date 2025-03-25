import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;

  @Column()
  photo: string;

  @Column()
  address: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

}