import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../_models/member';
import { MembersService } from '../../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Gallery, GalleryItem, GalleryModule, ImageItem} from 'ng-gallery'
@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: '../member-details/member-details.component.html',  //=== templateUrl: './member-details.component.html',
  styleUrl: '../member-details/member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = [];
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return;

    this.memberService.getMember(username).subscribe({
      next: member  =>{ this.member = member;
      this.member.photos.map(p => {
        this.images.push(new ImageItem({ src: p.url, thumb: p.url}))
      })
    }
    })
    console.log('data from web api' + this.member);
  }
}
