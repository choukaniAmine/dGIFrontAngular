import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
const BASIC_URL = "http://localhost:8020";
@Injectable({
  providedIn: 'root'
})
export class InscriptionServiceService {

constructor(private http: HttpClient) { }
register(signupRequest: any): Observable<any> {
  return this.http.post(`${BASIC_URL}/api/auth/signup`, signupRequest);
}
login(loginRequest: any): Observable<any> {
  return this.http.post(`${BASIC_URL}/api/auth/login`, loginRequest);
}
getContribuableByMatriculeFiscale(matriculefiscale: number): Observable<any> {
  return this.http.get(`${BASIC_URL}/api/auth/contribuableMatricule?matriculeFiscale=${matriculefiscale}`)
}
getAllInscription(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/auth/inscription")
}
checkDeclaration(request:any):Observable<any>{
  
  const url=BASIC_URL + "/api/auth/checkDeclaration";
  return this.http.post<any>(url, request);
}
verifyCode(code: string): Observable<any> {
  return this.http.get<any>(`${BASIC_URL}/api/auth/verify?code=${code}`);
}
creePassword(signupRequest: any): Observable<any> {
  return this.http.post(`${BASIC_URL}/api/auth/savepassword`, signupRequest);
}
}
