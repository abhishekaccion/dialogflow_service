import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

@Injectable()
export class IntentService {
  constructor(private http: HttpClient) {}

  createIntent(input) {
    const body = {
      operationName: "createIntents",
      query: `mutation createIntents($input:IntentsInput!){
        createIntents(input:$input){
        id
        status{
        code
        errorType
        }
        }
        }`,
      variables: input
    };
    const qparams = {
      params: {
        operationName: "createIntents",
        query: `mutation createIntents($input:IntentsInput!){
        createIntents(input:$input){
        id
        status{
        code
        errorType
        }
        }
        }`,
        variables: input
      }
    };
    return this.http.post("http://aicstage.accionlabs.com/api/accion", body);
  }

  indexIntent(input) {
    const body = {
      operationName: "createChat",
      query: `mutation createChat($input:ChatInputType!){
        createChat(input:$input){
           _id
        }
      }`,
      variables: input
    };
    return this.http.post("http://localhost:3001/graphql", body);
  }
}
