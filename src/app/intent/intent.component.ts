import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { IntentService } from "../intent.service";

@Component({
  selector: "app-intent",
  templateUrl: "./intent.component.html",
  styleUrls: ["./intent.component.css"]
})
export class IntentComponent {
  input: {};
  userSays = [];
  rForm: FormGroup;
  post: any; // A property for our submitted form
  description: string = "";
  name: string = "";

  constructor(private fb: FormBuilder, private _intentService: IntentService) {}

  ngOnInit() {
    this.rForm = this.fb.group({
      name: [null, Validators.required],
      OutputSpeech: [null, Validators.required],
      userSays: this.fb.array([this.initItemRows()]),
      webhookUsed: [true]
    });
  }

  initItemRows() {
    return this.fb.group({
      count: [0],
      data: [""]
    });
  }

  addNewRow() {
    const control = <FormArray>this.rForm.controls["userSays"];
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.rForm.controls["userSays"];
    control.removeAt(index);
  }

  addPost(post) {
    let OutputSpeech = post.OutputSpeech;
    delete post.OutputSpeech;
    post.userSays = post.userSays.map(say => ({
      count: say.count,
      data: [
        {
          text: say.data,
          userDefined: true
        }
      ]
    }));

    const input = { input: post };
    this._intentService.createIntent(input).subscribe(
      res => {
        //final response
        alert("success");

        const obj = {
          input: {
            intent: post.name,
            response: {
              speech: OutputSpeech,
              data: []
            },
            type: "chat"
          }
        };

        this._intentService.indexIntent(obj).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        //final errponse
        console.log(err);
        alert(err.message);
      }
    );
  }
}
