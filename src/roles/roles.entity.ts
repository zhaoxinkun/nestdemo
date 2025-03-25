import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

}