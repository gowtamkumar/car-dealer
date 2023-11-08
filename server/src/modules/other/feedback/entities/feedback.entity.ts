import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('feedbacks')
export class FeedbackEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy: string;

  // hooks
  @AfterInsert()
  logInsert(){
    console.log(`Inserted Feedback with id ${this.id}`);
  };

  @AfterUpdate()
  logUpdate(){
    console.log(`Updated Feedback with id ${this.id}`);
  };

  @AfterRemove()
  logRemove(){
    console.log(`Removed Feedback with id ${this.id}`);
  };
}