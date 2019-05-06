#include<stdio.h>
int mian(){
int i,j;
  for(i=1;i<=9;i++){
      j=i;
    for(i=1;i<=j;i++){

        printf("%d*%d=%d ",j,i,j*i);

    }
    printf("\n");
  }
  return 0;
}
