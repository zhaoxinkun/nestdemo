import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LogEntity } from '../log/log.entity';
import { RolesEntity } from '../roles/roles.entity';

// 创建实体
@Entity()
export class UserEntity {
  // PrimaryColumn是创建主键
  // 创建主键,并自动枚举生成就是用PrimaryGeneratedColumn注解
  @PrimaryGeneratedColumn()
  id: number;

  // 创建列数据
  @Column()
  username: string;

  @Column()
  password: string;

  // OneToMany(参数1:你需要链接的实体, 参数2:你需要链接的实体的属性名)
  @OneToMany(() => LogEntity, (log) => log.user)
  logs: LogEntity[];

  // ManyToMany(参数1: 需要链接的实体, 参数2: 需要链接的实体的属性名)
  @ManyToMany(() => RolesEntity, (roles) => roles.users)
  @JoinTable({ name: 'user_roles' })
  roles: RolesEntity[];
}