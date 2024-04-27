import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageServiceService } from './StorageService.service';
import { Observable } from 'rxjs';
const BASIC_URL = "http://localhost:8020";
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

constructor(private http:HttpClient) { }
createAuthorizationHeader(): HttpHeaders {
  let authHeaders: HttpHeaders = new HttpHeaders();
  const token = StorageServiceService.getToken(); // Call the getToken() method to retrieve the token
  if (token) {
    return authHeaders.set('Authorization', 'Bearer ' + token); // Note the space after 'Bearer'
  } else {
    // Handle case where token is not available
    console.error('Token not found in local storage');
    return authHeaders;
  }
}
getAllInscription(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/inscription", {
    headers: this.createAuthorizationHeader()
  })
}
acceptCompte(compte:any):Observable<any>{
return this.http.post(`${BASIC_URL}/api/admin/accept`,compte,{
  headers: this.createAuthorizationHeader()
});

}
getAllComptes(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/lescompte", {
    headers: this.createAuthorizationHeader()
  })
}
bloqueCompte(compteDto: any): Observable<any> {
  return this.http.post<any>(BASIC_URL + '/api/admin/bloqueCompte', compteDto, {
    headers: this.createAuthorizationHeader()
  });
}

debloqueCompte(compteDto: any): Observable<any> {
  return this.http.post<any>(BASIC_URL + '/api/admin/debloqueCompte', compteDto, {
    headers: this.createAuthorizationHeader()
  });
}
getAllContribuale(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/lesContribuables", {
    headers: this.createAuthorizationHeader()
  })
}
changePassword(req: any): Observable<any> {
  return this.http.post<any>(BASIC_URL + '/api/admin/changepassword', req, {
    headers: this.createAuthorizationHeader()
  });
}
}
