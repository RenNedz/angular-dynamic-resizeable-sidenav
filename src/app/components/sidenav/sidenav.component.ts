import { SidenavService } from './sidenav.service';
import { SidenavContentHostDirective } from './sidenav-content-host.directive';
import { RouterModule } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChild,
} from '@angular/core';

interface ResizingEvent {
  isTracking: boolean;
  startingWidth?: number;
  startingCursorX?: number;
  handleWidth: number;
  maxWidth?: number;
  minWidth?: number;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [RouterModule, SidenavContentHostDirective],
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('resizeHandle')
  resizeHandleRef?: ElementRef<HTMLElement>;

  @ViewChild('sidenavBody')
  sidenavBodyRef?: ElementRef<HTMLElement>;

  @ViewChild(SidenavContentHostDirective, { static: true })
  sidenavContentHost!: SidenavContentHostDirective;

  @HostBinding('class.resizing')
  get isResizing() {
    return this.resizingEvent.isTracking;
  }

  @HostBinding('class.expanded')
  isExpanded = true;

  resizingEvent: ResizingEvent = {
    isTracking: false,
    startingCursorX: 0,
    startingWidth: 0,
    handleWidth: 0,
    maxWidth: 0,
    minWidth: 200,
  };

  constructor(private sidenavService: SidenavService) {}

  ngAfterViewInit() {
    this.#setupResizeHandle();

    this.sidenavService.setContentHost(this.sidenavContentHost);
  }

  #setupResizeHandle(): void {
    if (
      this.resizeHandleRef === undefined ||
      this.sidenavBodyRef === undefined
    ) {
      return;
    }

    this.resizeHandleRef.nativeElement.addEventListener(
      'mousedown',
      (event) => {
        // if sidenav is closed, then simply open it and do nothing else
        if (!this.isExpanded) {
          this.toggleExpanded();
          return;
        }

        this.resizingEvent.isTracking = true;

        this.resizingEvent.startingCursorX = event.clientX;

        this.resizingEvent.startingWidth =
          this.sidenavBodyRef!.nativeElement.clientWidth;

        // max width is the width of the window minus the width of the handle
        this.resizingEvent.maxWidth =
          window.innerWidth - this.resizingEvent.handleWidth;
      }
    );
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.resizingEvent.isTracking) {
      return;
    }

    const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX!;

    let newWidth = Math.min(
      this.resizingEvent.startingWidth! + cursorDeltaX,
      this.resizingEvent.maxWidth!
    );

    newWidth = Math.max(newWidth, this.resizingEvent.minWidth!);

    document.body.style.setProperty('--sidenav-width', `${newWidth}px`);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.resizingEvent.isTracking = false;
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  expand() {
    this.isExpanded = true;
  }
}
