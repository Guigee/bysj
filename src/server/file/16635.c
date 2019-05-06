#include<stdio.h>
int main(){
int i,j,k;
  for(i=1;i<=9;i++){
      j=i;
    for(k=1;k<=j;k++){

        printf("%d*%d=%d ",j,k,j*k);

    }
    printf("\n");
  }
  return 0;
}

