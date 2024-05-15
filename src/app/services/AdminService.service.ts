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
return this.http.post(BASIC_URL+'/api/admin/accept',compte,{
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
getAllPeriodes(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/lesperiodes", {
    headers: this.createAuthorizationHeader()
  })
}
saveImpot(req: any): Observable<any> {
  return this.http.post<any>(BASIC_URL + '/api/admin/typeImpot', req, {
    headers: this.createAuthorizationHeader()
  });
}
getAllImpots(): Observable<any> {
  return this.http.get(BASIC_URL + "/api/admin/lesimpots", {
    headers: this.createAuthorizationHeader()
  })
}
saveDetailImpot(req: any): Observable<any> {
  return this.http.post<any>(BASIC_URL + '/api/admin/ajoutdetail', req, {
    headers: this.createAuthorizationHeader()
  });
}
getDetailByImpot(libelle: String): Observable<any> {
  return this.http.get(`${BASIC_URL}/api/admin/detailimpot?libelle=${libelle}`, {
    headers: this.createAuthorizationHeader()})
}
getTypeImpot(libelle: String): Observable<any> {
  return this.http.get(`${BASIC_URL}/api/admin/typeimpot?libelle=${libelle}`, {
    headers: this.createAuthorizationHeader()})
}
saveformuleImpot(impotDto: any) {
  return this.http.put(BASIC_URL + "/api/admin/updateformule", impotDto, {
    headers: this.createAuthorizationHeader()
  })
}
}
