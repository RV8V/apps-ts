import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as cheerio from 'cheerio'

@Injectable()
export class QuotesService {

    constructor(private http: HttpService){

    }

    getQuotes() {
      
        console.log('enter')

        var data = []

        return this.http.get('https://en.wikipedia.org/wiki/List_of_mosques_in_the_Arab_League')
                                        // .then()
            .pipe(
                map(response => response.data)
            );

        // console.log({ result })
    }

    getQuote(id){
        return this.http.get('http://quotesondesign.com/wp-json/posts/' + id)
            .pipe(
                map(response => response.data)
            );
    }

    getRandomQuote(){
        return this.http.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
            .pipe(
                map(response => response.data)
            );
    }

}
