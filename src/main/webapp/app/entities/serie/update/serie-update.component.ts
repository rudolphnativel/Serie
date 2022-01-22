import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ISerie, Serie } from '../serie.model';
import { SerieService } from '../service/serie.service';

@Component({
  selector: 'jhi-serie-update',
  templateUrl: './serie-update.component.html',
})
export class SerieUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [],
    dateHeureAjout: [],
  });

  constructor(protected serieService: SerieService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serie }) => {
      if (serie.id === undefined) {
        const today = dayjs().startOf('day');
        serie.dateHeureAjout = today;
      }

      this.updateForm(serie);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const serie = this.createFromForm();
    if (serie.id !== undefined) {
      this.subscribeToSaveResponse(this.serieService.update(serie));
    } else {
      this.subscribeToSaveResponse(this.serieService.create(serie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISerie>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(serie: ISerie): void {
    this.editForm.patchValue({
      id: serie.id,
      nom: serie.nom,
      dateHeureAjout: serie.dateHeureAjout ? serie.dateHeureAjout.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): ISerie {
    return {
      ...new Serie(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      dateHeureAjout: this.editForm.get(['dateHeureAjout'])!.value
        ? dayjs(this.editForm.get(['dateHeureAjout'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
