import { StudentsRepository } from "../application/usecases/repositories/StudentsRepository";
import { Student } from "../domain/entities/student";

export class InMemoryStudentsRepository implements StudentsRepository{
    public items: Student[] = [];
   
    async findById(id: string): Promise<Student | null> {
       const student = this.items.find(student=>student.id===id);

       if(!student){
         return null;
       }

       return student;
    }
}