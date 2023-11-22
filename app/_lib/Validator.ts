

export let errors: any[];



export class Validator {
    subject: any;
    errors: any;


    setValidate(subject: any) {
        this.subject = subject
        this.errors = []
    }

    string(): void {
        this.subject = String(this.subject)
    }

    min(num: number): void {
        if (this.subject.toString().length < num) this.errors.push(`${this.subject} min character is ${num}` )
    }   

    getErrors() {
        return this.errors.splice(0, 3)
    }
}

