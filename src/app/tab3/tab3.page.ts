import { Component } from '@angular/core';
import { TheMovieDBService } from '../the-movie-db.service';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [TheMovieDBService]
})

export class Tab3Page {
  

  constructor(public movieService:TheMovieDBService, public loadingController: LoadingController) {}
 
  public lista_filmes = new Array<any>();

  public page:number = 1;

  efeitoScrollInfinito(event) {
    this.page++;
    this.carregaPagina();

    setTimeout(() => {
      event.target.complete();

      // App logica para determinar se todos os dados estão carregados
      // e disabilitar o infinito scroll

      //if (this.page.length == 1000) {
      //  event.target.disabled = true;
      //}
    }, 1000);
  }

  efeitoRefresh(event){
    this.page = 1;
    this.carregaPagina();
    console.log('Iniciando operação assincrona');
  
    setTimeout( () => {
        event.target.complete();
        console.log('Fimalizando refresh');
    }, 500);
  }

  carregaPagina(){
    this.movieService.getPopularMovies(this.page,'en-US').subscribe(
      data=>{
        // Quando retorna um objeto
        const response = (data as any);

        if(this.page==1){
          this.lista_filmes = response.results;
        }else{
          this.lista_filmes = this.lista_filmes.concat(response.results);
        }        
        console.log(this.lista_filmes);
      },
      error=>{
        // Quando retorna um erro
        console.log(error);
      }
      
    );
  }


  ionViewDidEnter(){
    this.efeitoLoading();
    this.carregaPagina();
  }


  async efeitoLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "lines",
      message: 'Carregando Filmes...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }

}
