import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsuarioService } from '../../servicios/usuario.service';
import { CrearUsuarioDTO, DepartamentoDTO, FormUsuarioDTO, UsuarioDTO, obtenerUsuarioDTO } from '../dto_usuario/usuario.model';
import { DepartamentosService } from '../../servicios/departamentos.service';
import { Subscription } from 'rxjs';


@Component({
  providers: [MessageService],
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {

  @Input() isLaoding: boolean = false;
  //output
  @Output() onSubmitUsuario:EventEmitter<CrearUsuarioDTO>=new EventEmitter<CrearUsuarioDTO>();
  //input
  @Input() modeloUsuarioFormulario!: FormUsuarioDTO;
  @Input() modeloUnaUsuario!: obtenerUsuarioDTO;
  @Input() modoLectura!:boolean;
  //formulario
  formUsuario!:FormGroup;
  //
  idObtainForUpdate: string = '';
  loadingDepartamentos:boolean=true;
  subDepartamentos!:Subscription;
  modeloDepartamentos!:DepartamentoDTO[];
  instanciaDepartamento!:DepartamentoDTO;
  constructor(private formBuilder: FormBuilder,
    //public dialogService: ListarRolesComponent,
    public ref: DynamicDialogRef,
    private usuarioService:UsuarioService,
    private departamentosService:DepartamentosService,
    private router:Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.aplicarPatch();
    this.cargarDepartamentos();
    this.usuarioService.refresh$.subscribe(()=>{
      this.router.navigate(['/admin/usuario']);
    });
  }

  aplicarPatch(){
    if(this.modeloUnaUsuario != undefined){
      this.modeloUsuarioFormulario = {
        departamento_id: this.modeloUnaUsuario.departamento_id,
        email: this.modeloUnaUsuario.email,
        usuario: this.modeloUnaUsuario.usuario,
        nombre:  this.modeloUnaUsuario.nombre,
        apellido: this.modeloUnaUsuario.apellido
      }
      this.formUsuario.patchValue(this.modeloUsuarioFormulario);
    }
  }
  iniciarFormulario(){
    this.formUsuario = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      departamento_id: ['', Validators.required],
    });
  }
  cargarDepartamentos(){
    this.loadingDepartamentos=true;
    this.subDepartamentos=this.departamentosService.obtenerTodos().subscribe(departamentos=>{
        console.log(departamentos.data);
        this.loadingDepartamentos=false;
        this.modeloDepartamentos=departamentos.data;
      },error=>{
        this.loadingDepartamentos=false;
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error vuelva a recargar la página'});
      });
  }

  crearUsuario():void{
    if(this.formUsuario.invalid){
      this.messageService.add({severity:'info', summary: 'Success', detail: 'Debe completar todos los campos'});
      return Object.values(this.formUsuario.controls).forEach(control=>{
          control.markAsTouched();
      });
    }
    //todo ok
    let  instanciaUsuarioCrear:FormUsuarioDTO=this.formUsuario.value;
    instanciaUsuarioCrear.departamento_id=this.instanciaDepartamento.id;
    const crearUsuarioDTO=instanciaUsuarioCrear;
    this.onSubmitUsuario.emit(crearUsuarioDTO);
  }
  cerrarModal(){
    this.ref.close();
  }
  handleChange(e: any) {
    let isChecked = e.checked;
    this.formUsuario.value.is_staff = isChecked
  }
  OnDestroy(){
    if(this.subDepartamentos){
      this.subDepartamentos.unsubscribe();
    }
  }

  getCampoNoValido(campo: string) {
    return this.formUsuario.get(campo)?.invalid && this.formUsuario.get(campo)?.touched;
  }
}
