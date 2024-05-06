import { Observable } from 'rxjs';

/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_PERSONAL / LICENSE_COMMERCIAL in the project root for license information on type of purchased license.
 */

export interface Upload {
    themeName: string;
}

export abstract class UploadData {
    abstract importarClientes(formData: FormData, projetoId: number, isAdmin: boolean): Observable<any>;
}
